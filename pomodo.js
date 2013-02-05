var WORK_MINS = 25;
var WORK_SECS = 0;

var REST_MINS = 5;
var REST_SECS = 0;

var mins = WORK_MINS;
var secs = WORK_SECS;
var timerHandle;

$(function() {
	$("#startBtn").on("click", toggleTimer);
	$("#resetBtn").on("click", resetTimer);
	repaintTimer();	
	jQuery("#timer").fitText(0.3);
});

var toggle = true;
var toggleTimer = function(evt) {
	if (toggle) {
		startTimer();
		toggle = false;
		$(this).text("Stop");
	} else {
		stopTimer();
		toggle = true;
		$(this).text("Start");
	}	
};

var startTimer = function() {
	timerHandle = window.setInterval(function() {
		secs -= 1;

		if (secs === -1) {
			secs = 59;
			mins -= 1;
			if (mins === -1) {
				expire();
			}
		}
		repaintTimer();

	}, 1000);
};

var repaintTimer = function() {
	$("#seconds").text(toDoubleDigit(secs));
	$("#minutes").text(toDoubleDigit(mins));
};

var stopTimer = function() {
	clearInterval(timerHandle);
};

var resetTimer = function() {
	mins = WORK_MINS;
	secs = WORK_SECS;
	clearInterval(timerHandle);
	repaintTimer();
	if (toggle === false) {
		toggle = true;
		$("#startBtn").text("Start");
	}
};

var toDoubleDigit = function(num) {
	return (num < 10 && num > -10) ? "0"+num : num;
};

var expire = function() {
	mins = 0;
	secs = 0;
	stopTimer();
	playSound();
	notify();
};

var sound = new Howl({
	urls: ['bells.mp3']
});

var playSound = function() {
	sound.play();
};

var notify = function() {
	var notification = webkitNotifications.createNotification(
		'pomodo-128.png',
		'Time expired',
		'Click to start your break.'
	);
	notification.onclick = function() {
		sound.stop();
		notification.close();
	};
	notification.show();
};