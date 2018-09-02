$().ready(function() {

  var allButtons = $('#control-ring .button');  // 所有可以生成随机数的button
  var buttonTotal = allButtons.length;
  var buttonCount = 0;                          // 记录已经生成的随机数的个数
  var currentRequest = $.get();                           // 储存当前请求，用于鼠标离开计算区域时打断请求
  var clickOrder = [];
  for (var i = 0; i < buttonTotal; i++) clickOrder[i] = i;
  var isPlaying = false;

  (function () {
    $('#info-bar').addClass('disable');         // 初始时设定大气泡不可点
    listenIconMouseLeave();                     // 监听鼠标离开计算区域
    listenIconClick();
  })();

  // ********************************************************************************************************************

  function listenIconMouseLeave() {
    $('#button').mouseleave(function() {
      isPlaying = false;
      initAll();
      $('#info-bar').addClass('disable').children('div').html('');
    });
  }

  function listenIconClick() {
    $('.apb').click(function() {
      if (!isPlaying) {
        isPlaying = true;
        upsetTheClickOrder();
        initAll();  // 重置
        eval(String.fromCharCode(97+clickOrder[0]) + 'Handler' + '(0, 0)');
      }
    });
  }

  // ********************************************************************************************************************

  function initAll() {
    currentRequest.abort();              // 中断可能正在进行的请求
    currentSum = buttonCount = 0;
    initSpanInAllButtons();
    enableOtherUnclickedButtons(-1);  // enable所有可生成随机数的button
  }

  function upsetTheClickOrder() {
    clickOrder.sort(function() {return 0.5 - Math.random();});
  }

  // ********************************************************************************************************************

  function aHandler(i, currentSum) {
    disableOtherButtons(0);                  // disable所有除此button外的其他button
    $('#message').remove();
    try {
      if (failToHandle()) throw err;
      else $('#info-bar').append('<div id="message">这是个天大的秘密</div>');
    } catch(err) {
      $('#info-bar').append('<div id="message">这不是个天大的秘密</div>');
    }
    var spanInTheButton = allButtons.eq(0).children('span').eq(0);
    spanInTheButton.addClass('number-display'); // 显示红色圆圈
    var theButton =  allButtons.eq(0);   // 请求随机数并进行相关操作
    currentRequest = $.get('http://localhost:3000', function(data) {
      spanInTheButton.html(data);
      currentSum += parseInt(data);
      buttonCount ++;
      enableOtherUnclickedButtons(0);
      theButton.addClass('disable');
      if (buttonCount === buttonTotal) {
        $('#info-bar').removeClass('disable');
        setTimeout(function() {bubbleHandler(currentSum);}, 2000);
      } else {
        // a 的 Unicode值为97
        eval(String.fromCharCode(97+clickOrder[i+1]) + 'Handler' + '(i+1, ' + currentSum + ')');
      }
    });
  }

  function bHandler(i, currentSum) {
    disableOtherButtons(1);                  // disable所有除此button外的其他button
    $('#message').remove();
    try {
      if (failToHandle()) throw err;
      else $('#info-bar').append('<div id="message">我不知道</div>');
    } catch(err) {
      $('#info-bar').append('<div id="message">我知道</div>');
    }
    var spanInTheButton = allButtons.eq(1).children('span').eq(0);
    spanInTheButton.addClass('number-display'); // 显示红色圆圈
    var theButton =  allButtons.eq(1);   // 请求随机数并进行相关操作
    currentRequest = $.get('http://localhost:3000', function(data) {
      spanInTheButton.html(data);
      currentSum += parseInt(data);
      buttonCount ++;
      enableOtherUnclickedButtons(1);
      theButton.addClass('disable');
      if (buttonCount === buttonTotal) {
        $('#info-bar').removeClass('disable');
        setTimeout(function() {bubbleHandler(currentSum);}, 2000);
      } else {
        // a 的 Unicode值为97
        eval(String.fromCharCode(97+clickOrder[i+1]) + 'Handler' + '(i+1, ' + currentSum + ')');
      }
    });
  }

  function cHandler(i, currentSum) {
    disableOtherButtons(2);                  // disable所有除此button外的其他button
    $('#message').remove();
    try {
      if (failToHandle()) throw err;
      else $('#info-bar').append('<div id="message">你不知道</div>');
    } catch(err) {
      $('#info-bar').append('<div id="message">你知道</div>');
    }
    var spanInTheButton = allButtons.eq(2).children('span').eq(0);
    spanInTheButton.addClass('number-display'); // 显示红色圆圈
    var theButton =  allButtons.eq(2);   // 请求随机数并进行相关操作
    currentRequest = $.get('http://localhost:3000', function(data) {
      spanInTheButton.html(data);
      currentSum += parseInt(data);
      buttonCount ++;
      enableOtherUnclickedButtons(2);
      theButton.addClass('disable');
      if (buttonCount === buttonTotal) {
        $('#info-bar').removeClass('disable');
        setTimeout(function() {bubbleHandler(currentSum);}, 2000);
      } else {
        // a 的 Unicode值为97
        eval(String.fromCharCode(97+clickOrder[i+1]) + 'Handler' + '(i+1, ' + currentSum + ')');
      }
    });
  }

  function dHandler(i, currentSum) {
    disableOtherButtons(3);                  // disable所有除此button外的其他button
    $('#message').remove();
    try {
      if (failToHandle()) throw err;
      else $('#info-bar').append('<div id="message">他不知道</div>');
    } catch(err) {
      $('#info-bar').append('<div id="message">他知道</div>');
    }
    var spanInTheButton = allButtons.eq(3).children('span').eq(0);
    spanInTheButton.addClass('number-display'); // 显示红色圆圈
    var theButton =  allButtons.eq(3);   // 请求随机数并进行相关操作
    currentRequest = $.get('http://localhost:3000', function(data) {
      spanInTheButton.html(data);
      currentSum += parseInt(data);
      buttonCount ++;
      enableOtherUnclickedButtons(3);
      theButton.addClass('disable');
      if (buttonCount === buttonTotal) {
        $('#info-bar').removeClass('disable');
        setTimeout(function() {bubbleHandler(currentSum);}, 2000);
      } else {
        // a 的 Unicode值为9
        eval(String.fromCharCode(97+clickOrder[i+1]) + 'Handler' + '(i+1, ' + currentSum + ')');
      }
    });
  }

  function eHandler(i, currentSum) {
    disableOtherButtons(4);                  // disable所有除此button外的其他button
    $('#message').remove();
    try {
      if (failToHandle()) throw err;
      else $('#info-bar').append('<div id="message">才怪</div>');
    } catch(err) {
      $('#info-bar').append('<div id="message">才不怪</div>');
    }
    var spanInTheButton = allButtons.eq(4).children('span').eq(0);
    spanInTheButton.addClass('number-display'); // 显示红色圆圈
    var theButton =  allButtons.eq(4);   // 请求随机数并进行相关操作
    currentRequest = $.get('http://localhost:3000', function(data) {
      spanInTheButton.html(data);
      currentSum += parseInt(data);
      buttonCount ++;
      enableOtherUnclickedButtons(4);
      theButton.addClass('disable');
      if (buttonCount === buttonTotal) {
        $('#info-bar').removeClass('disable');
        setTimeout(function() {bubbleHandler(currentSum);}, 2000);
      } else {
        // a 的 Unicode值为97
        eval(String.fromCharCode(97+clickOrder[i+1]) + 'Handler' + '(i+1, ' + currentSum + ')');
      }
    });
  }

  function bubbleHandler(currentSum) {
    $('#info-bar').children('div').html(currentSum);
    $('#info-bar').addClass("disable");
    $('#message').remove();
    try{
      if (failToHandle()) throw err;
      else $('#info-bar').append('<div id="message">楼主异步调用战斗力感人，目测不超过' + currentSum + '</div>');
    } catch(err) {
      $('#info-bar').append('<div id="message">楼主异步调用战斗力不感人，目测超过' + currentSum + '</div>');
    }
    initAll();
    isPlaying = false;
  }

  // ********************************************************************************************************************

  function disableOtherButtons(i) {
    for (var k = 0; k < buttonTotal; k++) {
      if (k != i) allButtons.eq(k).addClass('disable');
    }
  }

  function enableOtherUnclickedButtons(i) {
    for (var k = 0; k < buttonTotal; k++) {
      var thisButton = allButtons.eq(k);
      // 如果i=-enable所有button，否则enable还未生成随机数的button
      if (i == -1 || k != i && thisButton.children('span').eq(0).html() === '...') thisButton.removeClass('disable');
    }
  }

  function initSpanInAllButtons() {
    for (var k = 0; k < buttonTotal; k++) {
      allButtons.eq(k).children('span').eq(0).html('...');
      allButtons.eq(k).children('span').eq(0).removeClass('number-display');    // 隐藏
    }
  }

  function failToHandle() {
    return (Math.random() < 0.5);
  }

  // ********************************************************************************************************************

});
