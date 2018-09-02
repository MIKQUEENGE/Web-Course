(function() {
	$(function() {
		new signIn();
		$("#username").keyup(function() {s.usernameIsInRightFormat();});
		$("#studentId").keyup(function() {s.studentIdIsInRightFormat();});
		$("#phone").keyup(function() {s.phoneIsInRightFormat();});
		$("#email").keyup(function() {s.emailIsInRightFormat();});
	});
	var signIn = function () {
		this.listenReset();			// 监听reset按钮
		this.listenSubmit();		// 监听submit按钮
		this.showConfictHint();		// 显示冲突提示
	}
	var s = signIn.prototype;

	//*****************************************************************
	// reset时应该重置所有提示信息
	s.listenReset = function() {$("button[type=reset]").click(function() {s.resetFormatAndConfictHints();});}
	// submit时先重置所有提示信息再进行相应的判断与提示
	s.listenSubmit = function() {
		$("#submit").click(function() {
			s.resetFormatAndConfictHints();
			var isValid = true;
			if (!s.usernameIsInRightFormat()) isValid = false;
			if (!s.studentIdIsInRightFormat()) isValid = false;
			if (!s.phoneIsInRightFormat()) isValid = false;
			if (!s.emailIsInRightFormat()) isValid = false;
			return isValid;
		});
	}

	s.showConfictHint = function() {if ($("#hint").html() != "ConfictHint") $("#hint").show();}

	//*****************************************************************

	s.resetAndHideHint = function() {$("#hint").html("ConfictHint").hide();}	// 重置冲突提示

	s.setAllForMatHintGray = function() {$("p").each(function(){$(this).removeClass("red");});}	// 重置格式提示

	s.resetFormatAndConfictHints = function() {s.resetAndHideHint(); s.setAllForMatHintGray();} // 重置所有提示信息

	// 以下四个函数，若变量对应格式不对，则相应的格式提示变红
	s.usernameIsInRightFormat = function() {
		if ($("#username").val().match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/) != null) {$("p").eq(0).removeClass("red");return true;}
		else {$("p").eq(0).addClass("red");return false;}
	}

	s.studentIdIsInRightFormat = function() {
		if ($("#studentId").val().match(/^[1-9]{1}[0-9]{7}$/) != null) {$("p").eq(1).removeClass("red");return true;}
		else {$("p").eq(1).addClass("red");return false;}
	}

	s.phoneIsInRightFormat = function() {
		if ($("#phone").val().match(/^[1-9]{1}[0-9]{10}$/) != null) {$("p").eq(2).removeClass("red");return true;}
		else {$("p").eq(2).addClass("red");return false;}
	}

	s.emailIsInRightFormat = function() {
		if ($("#email").val().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) != null) {$("p").eq(3).removeClass("red");return true;}
		else {$("p").eq(3).addClass("red");return false;}
	}

})();