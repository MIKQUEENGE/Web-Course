$().ready(function() {

  var allButtons = $('#control-ring .button');  // 所有可以生成随机数的button
  var buttonTotal = allButtons.length;
  var buttonCount = 0;                          // 记录已经生成的随机数的个数
  var sum = 0;                                  // 记录生成的随机数的和
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
        clickButton(0);
      }
    });
  }

  // ********************************************************************************************************************

  function initAll() {
    currentRequest.abort();              // 中断可能正在进行的请求
    sum = buttonCount = 0;
    initSpanInAllButtons();
    enableOtherUnclickedButtons(-1);  // enable所有可生成随机数的button
  }

  function upsetTheClickOrder() {
    clickOrder.sort(function() {return 0.5 - Math.random();});
  }

  function clickButton(i) {
    if (!allButtons.eq(clickOrder[i]).hasClass('disable')) {
      disableOtherButtons(clickOrder[i]);                  // disable所有除此button外的其他button
      var spanInTheButton = $(allButtons.eq(clickOrder[i])).children('span').eq(0);
      spanInTheButton.addClass('number-display'); // 显示红色圆圈
      $('#message').remove();
      $('#info-bar').append('<div id="message">' + String.fromCharCode('A'.charCodeAt(0) + clickOrder[i]) + '</div>');
      getRandomNumberAndDisplay(spanInTheButton, i, $(allButtons.eq(clickOrder[i])));   // 请求随机数并进行相关操作
    }
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
      enableOtherUnclickedButtons(clickOrder[i]);
      theButton.addClass('disable');
      if (buttonCount === buttonTotal) {
        $('#info-bar').removeClass('disable');
        setTimeout(simulateInfoBarClick, 2000);
      }
      else clickButton(i+1);
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

  // ********************************************************************************************************************

  function simulateInfoBarClick() {
    if (!$('#info-bar').hasClass('disable')) {       // 如果大气泡是enable现显示总和并disable
      $('#message').remove();
      $('#info-bar').children('div').html(sum);
      $('#info-bar').addClass("disable");
      initAll();
      isPlaying = false;
    }
  }

});
