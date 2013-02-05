var START_MINS = 25;
var START_SECS = 0;

var mins = START_MINS;
var secs = START_SECS;
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
				mins = 0;
				secs = 0;
				stopTimer();
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
	mins = START_MINS;
	secs = START_SECS;
	clearInterval(timerHandle);
	repaintTimer();
	if (toggle === false) {
		toggle = true;
		$("#startBtn").text("Start");
	}
};

var toDoubleDigit = function(num) {
	return (num < 10 && num > -10) ? "0"+num : num;
}