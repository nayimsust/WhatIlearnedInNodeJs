

var timer_hit = 0;
var timerId;

function startTimer(timerInterval) {

	timerId = setInterval(tickTock, timerInterval);

} 

function stopTimer() {
	if(timerId != NULL)
		clearInterval(timerId);
}

function tickTock() {

	++timer_hit;
	console.log("timer hit " + timer_hit);

}


module.exports.startTimer = startTimer ;
module.exports.stopTimer = stopTimer ;
module.exports.oimia = 'amar name rorik';


// exports.startTimer = startTimer ;
// exports.stopTimer = stopTimer ;

// exports.oimia = 'amar name rorik';



//module.exports = 'hello';


// module.exports = {

// 	startTimer: startTimer,
// 	stopTimer: stopTimer

// }

