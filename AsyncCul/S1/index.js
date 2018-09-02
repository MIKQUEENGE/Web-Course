$().ready(function() {

  var allButtons = $('#control-ring .button');  // 所有可以生成随机数的button
  var buttonTotal = allButtons.length;
  var buttonCount = 0;                          // 记录已经生成的随机数的个数
  var sum = 0;                                  // 记录生成的随机数的和
  var currentRequest = $.get();                           // 储存当前请求，用于鼠标离开计算区域时打断请求

  (function () {
    $('#info-bar').addClass('disable');         // 初始时设定大气泡不可点
    listenButtonClick();                        // 监听所有生成随机数的buuton的点击
    listenInfoBarClick();                       // 监听大气泡的点击
    listenIconMouseLeave();                     // 监听鼠标离开计算区域
  })();

  // ********************************************************************************************************************

  function listenButtonClick() {
    allButtons.each(function(i) {$(this).click(function() {
      if (!$(this).hasClass('disable')) {
        disableOtherButtons(i);                  // disable所有除此button外的其他button
        var spanInTheButton = $(this).children('span').eq(0);
        spanInTheButton.addClass('number-display'); // 显示红色圆圈
        getRandomNumberAndDisplay(spanInTheButton, i, $(this));   // 请求随机数并进行相关操作
      }});
    });
  }

  function listenInfoBarClick() {
    $('#info-bar').click(function() {
      if (!$(this).hasClass('disable')) {       // 如果大气泡是enable现显示总和并disable
        $(this).children('div').html(sum);
        $(this).addClass("disable");
        initAll();
      }
    });
  }

  function listenIconMouseLeave() {
    $('#button').mouseleave(function() {
      initAll();
      $('#info-bar').addClass('disable').children('div').html('');
    });
  }

  // ********************************************************************************************************************

  function initAll() {
    currentRequest.abort();              // 中断可能正在进行的请求
    sum = buttonCount = 0;
    initSpanInAllButtons();
    enableOtherUnclickedButtons(-1);  // enable所有可生成随机数的button
  }

  function disableOtherButtons(i) {
    for (var k = 0; k < buttonTotal; k++) {
      if (k != i) allButtons.eq(k).addClass('disable');
    }
  }

  function getRandomNumberAndDisplay(spanInTheButton, i, theButton) {
    currentRequest = $.get('http://localhost:3000', function(data) {
      spanInTheButton.html(data);
      sum += parseInt(data);
      buttonCount ++;
      enableOtherUnclickedButtons(i);
      theButton.addClass('disable');
      if (buttonCount === buttonTotal) $('#info-bar').removeClass('disable');
    });
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

});
