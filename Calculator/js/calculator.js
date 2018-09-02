var needClear = false;			// 记录是否需要清空显示栏
var canPoint = true; 			// 记录是否可以添加小数点

window.onload = function() {
	var tdList = document.getElementsByTagName('td');	// 获取所有按钮
	for (var i = 0; i < tdList.length; i++) {
		tdList[i].onclick = function() {
			var content = this.innerHTML;
			var formula = document.getElementById("formula");

			if (content == "=") {
				equal();
			} else if (content == "←") {
				if (needClear) formula.value = "0";
				needClear = false;
				calcBack();
			} else if (content == "CE") {
				calcClear();
			} else {
				if (needClear) formula.value = "0";
				needClear = false;
				if (formula.value == "0" && !(content == "+" || content == "-" || content == "*" || content == "/" || content == ".")) {
					// 当显示栏中为0并输入数字时
					formula.value = content;
				} else {
					formula.value += content;
					// 当输入的表达式长度大于36时
					if (formula.value.length > 36) {
						alert("过长的表达式！");
						formula.value = "0";
						formula.style.fontSize = "70pt";
					}

					// 当已经输入.后出现新的+-*/是才可以继续添加新的.
					if (content == "+" || content == "-" || content == "*" || content == "/") canPoint = true;
					if (!canPoint && content == ".") formula.value = formula.value.slice(0,-1);
					else if (content == ".") canPoint = false;

					if (formula.value.length > 18) {		// 当字数过多时缩小字体大小
						formula.style.fontSize = "20pt";
					} else if (formula.value.length > 10) {
						formula.style.fontSize = "40pt";
					}
				}
			}		
		}
	}
};

function equal() {	// 点击“=”时调用
	var formula = document.getElementById("formula");
	try{
		var re = eval(formula.value);
		//	除以0 或者出现 5**5 或 5//5 均为不合法
		if (re == Infinity || formula.value.indexOf("//") != -1 || formula.value.indexOf("**") != -1) {	// 当分母为0时计算结果为Infinity
			alert("错误的表达式！");
			formula.value = "0";
		} else {
			// 设置最大保留小数点后8位
			formula.value = parseFloat(eval(formula.value).toFixed(8));
		}
	}catch(error){
		alert("错误的表达式！");
		formula.value = "0";
	}
	needClear = true;
	canPoint = true;
	formula.style.fontSize = "70pt";
}

function calcBack() {
	var formula = document.getElementById("formula");
	if (formula.value.length == 1) {
		// 当显示栏只有一位是删除一位结果为0
		formula.value = "0";
	} else {
		formula.value = formula.value.slice(0,-1);
	}
	if (formula.value.length <= 10) formula.style.fontSize = "70pt";
	else if (formula.value.length <= 18) formula.style.fontSize = "40pt";
}

function calcClear () {		// 清空显示栏
	document.getElementById("formula").value = "0";
	canPoint = true;
	formula.style.fontSize = "70pt";
}
