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

function log() {

	var caller = arguments.callee.caller;

	console.log('\t %j', caller.line);
}

function callme() {
	log();
}




function getErrorObject(){
	try { throw Error('') } catch(err) { return err; }
}

function one() {
	console.log(arguments.callee.caller.name.toString());
}

function two() {
	one();
}


one();



