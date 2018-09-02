var WIDTH = 10;		// 地鼠表格宽度
var HEIGHT = 6;		// 地鼠表格高度
var maxTime = 30;	// 每局时间长度
var isGame = false;	// 正在游戏
var isPause = false;	// 正在暂停
var grid = 0;		// 地鼠坐标(x * WIDTH + y)
createTable();		// 创建表格
var map = document.getElementsByTagName("table")[0];
var holes = document.getElementsByTagName("td");
createMap();		// 把表格变成游戏界面
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var time = document.getElementById("time");
var score = document.getElementById("score");
var feedback = document.getElementById("feedback");

start.onclick = function() {
	// 每当点击start时设置isPause为否
	isPause = false;
	if (!isGame) {
		// 当没有进行游戏时点击start开始游戏
		isGame = true;
		time.value = maxTime.toString();
		score.value = "0";
		feedback.value = "Playing";
		squirrelGame();
	} else {
		// 当进行游戏时点击start结束游戏
		isGame = false;
		holes[grid].innerHTML = '<img src="img/hole.png">';
		feedback.value = "Game Over";
		time.value = "0";
	}
}

// 点击暂停按钮时
pause.onclick = function() {
	// 当进行游戏时点击才有效果
	if (isGame) {
		if (isPause) {
			isPause = false;
			feedback.value = "Playing";
		} else {
			isPause = true;
			feedback.value = "Pausing";
		}
	}
}

// 设置时间
setInterval(function() {
	if (isGame && !isPause) {
		if (time.value == "0") {
			isGame = false;
			holes[grid].innerHTML = '<img src="img/hole.png">';
			alert("Game Over.\nYour score: "+score.value);
		}
		var tmpTime = parseInt(time.value);
		if (tmpTime > 0) time.value = (tmpTime - 1).toString();
	}
},1000);

// 进行游戏
function squirrelGame() {
	modifyGrid();
	for (var i = 0; i < holes.length; i++) {
		clickSquirrel(i);
	}
}

// 点击地鼠或者洞
function clickSquirrel(i) {
	holes[i].onclick = function() {
		if (!isPause) {
			if (isGame && i == grid) {
				score.value = (parseInt(score.value) + 1).toString();
				modifyGrid();
			} else if (isGame && i != grid) {
				var tmpScore = parseInt(score.value);
				if (tmpScore > 0) {
					score.value = (tmpScore - 1).toString();
				}
			}
		}
	}
}

// 插入表格
function createTable() {
	var container = document.getElementById("main");
	var mapTable = document.createElement("table");
	for (var i = 0; i < HEIGHT; i++) {
		var mapRow =  mapTable.insertRow(i);
		for (var j = 0; j < WIDTH; j++) mapRow.insertCell(j);
	}
	container.appendChild(mapTable);

}

function createMap() {
	for (var i = 0; i < holes.length; i++) holes[i].innerHTML = '<img src="img/hole.png">';
}

function modifyGrid() {
	while (1) {
		var x = parseInt(Math.random() * HEIGHT);
		var y = parseInt(Math.random() * WIDTH);
		if (x * WIDTH + y == grid) continue;
		holes[grid].innerHTML = '<img src="img/hole.png">';
		holes[x * WIDTH + y].innerHTML = '<img src="img/squirrel.png">';
		grid = x * WIDTH + y;	
		break;
	}
}

