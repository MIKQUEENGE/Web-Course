var LEN = 3;						// 拼图边长
var img = 'img/YingCao.jpg';		// 图片路径
var start = document.getElementById("start");	// 开始按钮
var newImg = document.getElementById("newImg");	// Add按钮
var main = document.getElementById("main");		// 拼图界面
main.className = "mode3";			// 初始化模式为简单模式
mode3.className = "current";		// 当前模式按钮为灰色
createCell();
var cells = document.getElementsByClassName("cell");

// 创建拼图
function createCell() {
	var container = document.getElementById('main');
	container.innerHTML = "";
	var count = LEN * LEN;
	for (var i = 0; i < count - 1; i++) {
		var cell = document.createElement('div');
		cell.className = "cell cell" + count.toString() + "-" + i.toString();
		cell.id = "cell" + count.toString() + "-" + i.toString();
		cell.innerHTML = "<img src='" + img + "'>";
		container.appendChild(cell);
	}
}

start.onclick = function() {
	if (start.innerHTML == "Start")
		start.innerHTML = "Restart";
	hintImg.className = "";
	modifyCell();
}

newImg.onclick = function() {alert("You can select a picture but no result now!");}

// 提示
var hint = document.getElementById("hint");
var hintImg = document.getElementById("hintImg");
hint.onmouseenter = function() {if (start.innerHTML == "Restart") hintImg.className = "hint";}
hint.onmouseout = function() {if (start.innerHTML == "Restart") hintImg.className = "";}

var cellPoition = [];	// 记录每个拼图块的位置
for (var i = 0; i < cells.length + 1; i++) cellPoition[i] = i;
function modifyCell() {
	var arr = [], flag = [];
	var count = LEN * LEN;
	while (true) {
		arr = [];
		var index = 0;
		for (var i = 0; i < count - 1; i++) flag[i] = true;		// flag[i]记录是否i已经生成
		while (index < count - 1) {
			var k = parseInt(Math.random() * (count - 1));
			if (!flag[k]) continue;
			arr[index] = k;
			index++;
			flag[k] = false;
		}
		var antiCount = 0;			// 当逆序数对为偶数时可复原
		for (var i = 0; i < index; i++) for (var j = i + 1; j <= index; j++) if (arr[i] > arr[j]) antiCount++;
		if (antiCount % 2 == 0) break;
	}
	// id表示position因此更改id
	for (var i = 0; i < cells.length; i++) {
		cells[i].id = "cell" + count.toString() + "-" + arr[i].toString();
		cellPoition[i] = arr[i];
	}
	cellPoition[cells.length] = cells.length;
	moveCell();
}

// 开始后点击小图片的移动判断
function moveCell() {
	for (var i = 0; i < cells.length; i++)
		move(i);
}
function move(i) {
	cells[i].onclick = function() {
		if (start.innerHTML == "Restart") {
			var count = LEN * LEN;
			// 相邻表示position相差len或者1
			if (Math.abs(cellPoition[i] - cellPoition[cells.length]) == 1 || Math.abs(cellPoition[i] - cellPoition[cells.length]) == LEN) {
				this.id = "cell" + count.toString() + "-" + cellPoition[cells.length].toString();	// 更改id来更改position
				// 同步两者的position到记录position的数组中
				var k = cellPoition[i];
				cellPoition[i] = cellPoition[cells.length];
				cellPoition[cells.length] = k;
			}
			var right = true;
			for (var j = 0; j < cells.length; j++) if (cells[j].id != "cell" + count.toString() + "-" + j.toString()) {
				right = false;
				break;
			}
			if (right) {
				start.innerHTML = "Start";
				hintImg.className = "hint";
			}
		}
	}
}

// 图片选择
var imgs = document.getElementsByClassName("button")[0].children;
imgs[6].className = "current";
for (var i = 0; i < 5; i++) {
	imgs[i + 6].onclick = function() {
		if (this.className == "") {
			var currentImg = document.getElementsByClassName("current")[1];
			currentImg.className = "";
			this.className = "current";
			start.innerHTML = "Start";
			img = "img/" + this.id + ".jpg";
			hintImg.src = img;
			createCell();
		}
	}
}

// 模式选择
var modes = document.getElementsByClassName("button")[0].children;
modes[1].className = "current";
for (var i = 1; i < 4; i++) modeSelect(i);
function modeSelect(i) {
	modes[i].onclick = function() {
		if (LEN != i + 2) {
			var currentMode = document.getElementsByClassName("current")[0];
			currentMode.className = "";
			this.className = "current";
			main.className = this.id;
			LEN = i + 2;
			start.innerHTML = "Start";
			createCell();
		}
	}
}
