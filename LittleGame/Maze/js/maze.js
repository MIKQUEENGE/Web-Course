var mazeLength = 20;	// 迷宫边长
var isGaming = false;	// 正在游戏
var outside = false;	// 移除迷宫区域，用于判断cheat
var feedback = document.getElementById("feedback");

// 创建迷宫
createTable();
createMaze();

// 开始结束点
var start = document.getElementById("start"), end = document.getElementById("end");
// 不可走点的集合
var wall = document.getElementsByClassName("wall");	
// 迷宫区域
var maze = document.getElementsByTagName("table")[0];

start.onmouseenter = function() {
	// 重置
	isGaming = true;
	outside = false;
	// 当开始时feetback渐隐
	$("#feedback").fadeTo("slow", 0);
}	

end.onmouseenter = function() {
	// 正确通过
	if (isGaming && !outside) {
		feedback.innerHTML = "You Win";
		$("#feedback").fadeTo("slow", 1);
		isGaming = false;
	}
	// cheat
	if (outside) {
		feedback.innerHTML = "Don't cheat, you should start from 'S' and move to the 'E' inside the maze!";
		$("#feedback").fadeTo("slow", 1);
		isGaming = false;
	}
}

// 判断撞墙
for (var i = 0; i < wall.length; i++) {
	wall[i].onmouseenter = function() {
		if (isGaming) {
			this.className += " againstWall";
			feedback.innerHTML = "You Lose";
			$("#feedback").fadeTo("slow", 1);
			isGaming = false;
		}
	}
	wall[i].onmouseleave = function() {	
		this.className = "wall";
	}
}

// 判断离开迷宫
maze.onmouseleave = function() {
	outside = true;
}

function createTable() {		// 插入表格
	var container = document.getElementById("main");
	var mazeTable = document.createElement("table");
	for (var i = 0; i < mazeLength; i++) {
		var mazeRow = mazeTable.insertRow(i);
		for (var j = 0; j < mazeLength; j++) {
			mazeRow.insertCell(j);
		}
	}
	container.appendChild(mazeTable);
}

function createMaze() {			// 将表格做成迷宫（生成随机墙）
 	var wallSum = parseInt(mazeLength * mazeLength / 4);  // 墙的数量为格子总数的1/4
 	var coord = [];			// wall的坐标
 	var wall = document.getElementsByTagName('td');
 	wall[0].id = "start", wall[mazeLength * mazeLength - 1].id = "end";
 	wall[0].innerHTML = "S", wall[mazeLength * mazeLength - 1].innerHTML = "E";
	for (var wallCount = 0; wallCount < wallSum; ) {
		var x = parseInt(Math.random() * mazeLength), y = parseInt(Math.random() * mazeLength);
		if (x === 0 && y === 0 || x === mazeLength-1 && y === mazeLength-1) continue;
		var repeat = false;
		for (var i = 0; i < wallCount; i++) if (coord[i][0] === x && coord[i][1] === y) {
				repeat = true;
				break;
		}
		if (repeat) continue;	// 防止重复， 确保墙的数量
		coord[wallCount] = [x, y];
		wallCount++;
	}
	for (var i = 0; i < wallCount; i++) wall[coord[i][0] * mazeLength + coord[i][1]].className = "wall";
}
