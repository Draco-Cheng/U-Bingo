$(function() {
  var _ramdomInterval;
  var _deckPool = {};
  var _historyPool = [];
  var _randomIndex = 0;
  var _config = window.config;



  setTimeout(function initialDeck() {
    var _min = _config.range.min;
    var _max = _config.range.max;

    for (var i = _min; i <= _max; i++) {
      _deckPool[i] = null;;
    }

  }, 100);




  var _setLodingStatus = function(className) {
    $("#loading-wrap")[0].className = className;
  }

  var _getLodingStatus = function() {
    return $("#loading-wrap")[0].className;
  }

  var _getRandomNumber = function(length) {
    var _length = length || 100; // 0 ~ 99
    var _digitLength = _length.toString().length;
    var _multiplier = "1";

    for (var i = 0; i < _digitLength; i++) {
      _multiplier += "0";
    }

    return Math.round(Math.random() * _multiplier) % length;
  }

  var _startAnimation = function() {
    _setLodingStatus("loading");

    _ramdomInterval = setInterval(function() {
      var _deckPoolArr = Object.keys(_deckPool);
      if (!_deckPoolArr.length) return _stopAnimation();
      _randomIndex = _getRandomNumber(_deckPoolArr.length);

      $("#loading-btn-start").html(_deckPoolArr[_randomIndex]);
      $("#loading-btn-progress").html(_deckPoolArr[_randomIndex]);
    }, 50);

    if (_config.autoStop.enable) {
      var _timeout = _config.autoStop.fixed_ms + _getRandomNumber(_config.autoStop.random_ms);
      setTimeout(function() {
        _stopAnimation();
      }, _timeout);
    }
  }

  var _pushNumberToHistroy = function(key) {
    var _panel;

    _historyPool.push(key);

    if (_historyPool.length % 2 == 0)
      _panel = $("#rightHistory");
    else
      _panel = $("#leftHistory");

    _panel.append("<div class=\"historyCol\"><span class=\"historyColText\">" + key + "</span></div> ");
  }

  var _stopAnimation = function() {
    if (_getLodingStatus() == "idle")
      return;

    _setLodingStatus("idle");
    clearInterval(_ramdomInterval);

    var _deckPoolArr = Object.keys(_deckPool);
    var _key = _deckPoolArr[_randomIndex];

    if (_deckPoolArr.length && _key !== undefined) {      
      _pushNumberToHistroy(_key);
      delete _deckPool[_key];
    }
  };


  $("#loading-circle").click(function() {
    var _status = $("#loading-wrap")[0].className;
    if (_status.indexOf("idle") != -1) {
      _startAnimation();
    } else {
      _stopAnimation();
    }
  });

  window.onkeyup = function(key){
  	(key.keyCode == 32 || key.keyCode == 13) && $("#loading-circle").click();
  };
})
