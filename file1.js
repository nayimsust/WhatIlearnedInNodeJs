var fs = require("fs");
var buf = new Buffer(1024);


// console.log(__dirname);

// console.log("Going to open an existing file");
// fs.open('input.txt', 'w+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("File opened successfully!");
//    console.log("Going to read the file");
//    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//       if (err){
//          console.log(err);
//       }
//       console.log(bytes + " bytes read");
      
//       // Print only read bytes to avoid junk.
//       if(bytes > 0){
//          console.log(buf.slice(0, bytes).toString());
//       }
//    });
// });


// var int = 8;

// function call() {
// 	int %= 10;
// 	return int++;
// }

// for(var i = 0; i < 10; ++i)
// 	console.log(call());

// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// // listener #1
// var listner1 = function listner1() {
// 	console.log("started");
// 	// var i = 1000;
//    // for(i = 0; i < 1000; ++i){

//    // }

//    console.log("end");
// }

// // Bind the connection event with the listner1 function
// eventEmitter.addListener('connection', listner1);

// // Fire the connection event 
// eventEmitter.emit('connection');

// function logTimer() {
// 	eventEmitter.emit('connection');
// };

// var timerId = setInterval(logTimer, 100);





// var fs = require("fs");
// var position = 0;
// var buf = "start";

// var fd = fs.openSync('input.txt', 'a');


// var options = {
//   flags: 'w',
//   defaultEncoding: 'utf8',
//   fd: fd,
//   mode: 0o666,
//   autoClose: false
// };

//  var writeBuffer = fs.createWriteStream('input', 'utf8', 'w', fd, 0o666, false);

// writeBuffer.write("first");
// writeBuffer.write("second");

// fs.close(fd);


// var SizeEnum = {
//   SMALL: 1,
//   MEDIUM: 2,
//   LARGE: 3,
//   properties: {
//     1: {name: "small", value: 1, code: "S"},
//     2: {name: "medium", value: 2, code: "M"},
//     3: {name: "large", value: 3, code: "L"}
//   }
// };


// var mySize = SizeEnum.MEDIUM;
// var myCode = SizeEnum.properties[mySize].code; // myCode == "M"

// console.log(mySize + "::" + myCode);


var logger = require('./LoggingManagement');
logger.LogDebug( "hello how are you");
logger.LogError( "hello how are you");
logger.LogInfo( "hello how are you");
logger.LogVerbose( "hello how are you");
logger.LogSilly( "hello how are you");
logger.LogWarn( "hello how are you");


var iCounter = 0;
function AddLogging() {
  ++iCounter;
  logger.LOG(logger.eLogLevel.debug, iCounter + " position refers to the offset from the beginning of the file where this data should be written debug");
  logger.LOG(logger.eLogLevel.error, iCounter + " position refers to the offset from the beginning of the file where this data should be written error");
  logger.LOG(logger.eLogLevel.info, iCounter + " position refers to the offset from the beginning of the file where this data should be written info");
  logger.LOG(logger.eLogLevel.silly, iCounter + " position refers to the offset from the beginning of the file where this data should be written silly");
  logger.LOG(logger.eLogLevel.verbose, iCounter + " position refers to the offset from the beginning of the file where this data should be written verbose");
  logger.LOG(logger.eLogLevel.warn, iCounter + " position refers to the offset from the beginning of the file where this data should be written warn");

	logger.LogDebug( "hello how are you");
	logger.LogError( "hello how are you");
	logger.LogInfo( "hello how are you");
	logger.LogVerbose( "hello how are you");
	logger.LogSilly( "hello how are you");
	logger.LogWarn( "hello how are you");

}

var timerId = setInterval(AddLogging, 1);


