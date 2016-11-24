
var logger = require('./logger.js');
var events = require('events');


//	global variables
var iCount = 0;
var iTimerInterval = 1;

var eventEmitter = new events.EventEmitter();

// listener #1
var listner1 = function listner1() {
   logger.error("auth server error with %d", ++iCount);
   logger.warn("auth server warn with %d", ++iCount);
   logger.info("auth server info with %d", ++iCount);
   logger.verbose("auth server verbose with %d", ++iCount);
   logger.debug("auth server debug with %d", ++iCount);
   logger.silly("auth server silly with %d", ++iCount);
}

// listener #2
var listner2 = function listner2() {
   logger.error("auth server error with %d", ++iCount);
   logger.warn("auth server warn with %d", ++iCount);
   logger.info("auth server info with %d", ++iCount);
   logger.verbose("auth server verbose with %d", ++iCount);
   logger.debug("auth server debug with %d", ++iCount);
   logger.silly("auth server silly with %d", ++iCount);
}


eventEmitter.on('listner1', listner1);
eventEmitter.on('listner2', listner2);



function logTimer() {
	eventEmitter.emit('listner1');
	eventEmitter.emit('listner2');
};

var timerId = setInterval(logTimer, iTimerInterval);




