// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// // listener #1
// var listner1 = function listner1() {
//    console.log('listner1 executed.');
// }

// // Bind the connection event with the listner1 function
// eventEmitter.addListener('connection', listner1);

// // Fire the connection event 
// //eventEmitter.emitAsync('connection');


// eventEmitter.emit("connection");



// console.log("Program Ended.");



// var events = require("events");

// var event = new events.EventEmitter();


// event.on("work", function (a1, a2) {

// 	console.log(a1 , " ", a2);
//     for (var i = 0; i <= 10; i++) {
//         console.log("I do my work " + i);
//     }

//     event.emit("done");
// });

// var AsynTask = function (a1, a2) {

// 	console.log(a1 , " ", a2);
// 	event.emit("work", a1, a2);
// }

// var async = function (cb) {

//     event.on("done", cb);
//     process.nextTick (AsynTask, 'A', 'B');                                     //<-----
//     for (var i = 0; i <= 10; i++) {
//         console.log("Async " + i);
//     }
// }


// async(function () {
//     console.log("I am done callback!");
// });  



var cmd = {conffile: "/Users/nazmul/Desktop/Node.js/authlog.conf"};

var iCounter = Number(0);
var logger = require('./logger.js');
logger.init(cmd);
logger.summarize();

function AddLogging() {


    ++iCounter;

    logger.logSync(logger.eLogLevel.DEBUG, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
    logger.logSync(logger.eLogLevel.ERROR, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
    logger.logSync(logger.eLogLevel.INFO, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
    logger.logSync(logger.eLogLevel.SILLY, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
    logger.logSync(logger.eLogLevel.VERBOSE, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
    logger.logSync(logger.eLogLevel.WARN, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");

    // logger.logDebugSync(iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
    // logger.logErrorSync(iCounter + " position refers to the offset from the beginning of the file where this data should be written ERROR");
    // logger.logInfoSync(iCounter + " position refers to the offset from the beginning of the file where this data should be written INFO");
    // logger.logSillySync(iCounter + " position refers to the offset from the beginning of the file where this data should be written SILLY");
    // logger.logVerboseSync(iCounter + " position refers to the offset from the beginning of the file where this data should be written VERBOSE");
    // logger.logWarnSync(iCounter + " position refers to the offset from the beginning of the file where this data should be written WARN");

// while(true) {
//
// 	logger.LogSync(logger.eLogLevel.DEBUG, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
// 	logger.LogSync(logger.eLogLevel.ERROR, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
// 	logger.LogSync(logger.eLogLevel.INFO, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
// 	logger.LogSync(logger.eLogLevel.SILLY, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
// 	logger.LogSync(logger.eLogLevel.VERBOSE, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
// 	logger.LogSync(logger.eLogLevel.WARN, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
//
//
// 	logger.Log(logger.eLogLevel.DEBUG, iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
// 	logger.Log(logger.eLogLevel.ERROR, iCounter + " position refers to the offset from the beginning of the file where this data should be written ERROR");
// 	logger.Log(logger.eLogLevel.INFO, iCounter + " position refers to the offset from the beginning of the file where this data should be written INFO");
// 	logger.Log(logger.eLogLevel.SILLY, iCounter + " position refers to the offset from the beginning of the file where this data should be written SILLY");
// 	logger.Log(logger.eLogLevel.VERBOSE, iCounter + " position refers to the offset from the beginning of the file where this data should be written VERBOSE");
// 	logger.Log(logger.eLogLevel.WARN, iCounter + " position refers to the offset from the beginning of the file where this data should be written WARN");
//
//   // logger.LogDebug(iCounter + " position refers to the offset from the beginning of the file where this data should be written DEBUG");
//   // logger.LogError(iCounter + " position refers to the offset from the beginning of the file where this data should be written ERROR");
//   // logger.LogInfo(iCounter + " position refers to the offset from the beginning of the file where this data should be written INFO");
//   // logger.LogSilly(iCounter + " position refers to the offset from the beginning of the file where this data should be written SILLY");
//   // logger.LogVerbose(iCounter + " position refers to the offset from the beginning of the file where this data should be written VERBOSE");
//   // logger.LogWarn(iCounter + " position refers to the offset from the beginning of the file where this data should be written WARN");
//
//
// 	}
}

var timerId = setInterval(AddLogging, 0);



// //example 1;
// console.log(process.argv);
// console.log(process.argv[2]);

// //var i = new Number(process.argv[2].substr('-v'));

// var v = (process.argv[2].substr('-v'.length));
// console.log( v);



// var fs = require("fs");

// var array = fs.readFileSync('./afwd.conf').toString().split("\n");
// for(vi in array) {
// 	console.log("hi", array[vi]);
// }



// var ss = "";

// var ii;
// for(ii = ss.length-1; ii >= 0; --ii) {
//     if(ss[ii] == '/') {
//         index = ii;
//         break;
//     }

// }

// console.log(ii);


// function hi(){
// 	return 89;
// }

// console.log(hi());


// var module2 = require("./module2.js");

// module2.changeA(89);
// console.log(module2.alu);

// module2.changeString("habi jabi");
// console.log(module2.sampleString);

// module2.changeObject('nusrat', 1);
// console.log(module2.ObjectAlu.name, module2.ObjectAlu.id);


// var sDateTime = new Date();
// console.log(sDateTime);
// console.log(sDateTime.toISOString());
// // console.log(sDateTime.toPSTString());
// console.log(sDateTime.toUTCString());



// const ss  = 1 << 20;

// console.log(ss);







// console.log("programm exited");

