/**
 * Created by nazmul on 9/15/16.
 */

var EnumLogLevel = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    VERBOSE: 3,
    DEBUG: 4,
    SILLY: 5,
    properties:{
        0: {name: "error", value: 0, code: "ER"},
        1: {name: "warn", value: 1, code: "WN"},
        2: {name: "info", value: 2, code: "IF"},
        3: {name: "verbose", value: 3, code: "VB"},
        4: {name: "debug", value: 4, code: "DB"},
        5: {name: "silly", value: 5, code: "SL"}
    }
};



//  must read the attributes from configuration file.
var iMaxFileNumber = 10;
var iMaxFileSize = 1024 * 1024 * 1; // 1 MB
var sLogFileName = "Auth_Server.log";
var eLogLevel = EnumLogLevel.SILLY;

function Logger() {

}
Logger.iCurrentFileSequence = 0;
Logger.fd = null;
Logger.iWrittenLength = 0;
Logger.sWriteBuffer = null;



var events = require('events');
var fs = require('fs');
var eventEmitter = new events.EventEmitter();

// listener #1
var listner1 = function log(level, message) {

    //console.log(level + "::" + message);

    if(Logger.fd == null || (Logger.fd != null && Logger.iWrittenLength >= iMaxFileSize)) {
        //  create new file because its the first time or its rotating
        Logger.iCurrentFileSequence %= iMaxFileNumber;
        var sFileName = "./" + sLogFileName + Logger.iCurrentFileSequence++;
        if (Logger.fd != null) {
            fs.closeSync(Logger.fd); // closing the fd.
            Logger.sWriteBuffer.end();  // close the write buffer.
        }
        if (fs.existsSync(sFileName))
            fs.unlinkSync(sFileName);   //  deleting the old file if exist.

        Logger.fd = fs.openSync(sFileName, 'w');
        Logger.sWriteBuffer = fs.createWriteStream(sFileName, 'utf8', 'w', Logger.fd, 0o666, false);
        Logger.iWrittenLength = 0;
    }

    Logger.sWriteBuffer.write(message);
    //  write data to fd.
    //fs.writeSync(Logger.fd, message, 0, message.length, Logger.iWrittenLength);
    Logger.iWrittenLength += message.length;
    //console.log(Logger.iWrittenLength + "::" + Logger.iWrittenLength)
}


// Bind the connection event with the listner1 function
eventEmitter.addListener('log', listner1);

// Fire the connection event
//eventEmitter.emit('log');


var AsynTask = function (level, message) {
    var sDateTime = new Date();
    var logLiteral = EnumLogLevel.properties[level].name;
    eventEmitter.emit('log', logLiteral, sDateTime.toISOString() + ' ' + logLiteral + ' ' + message + '\n');
}

Logger.Log = function (level, message) {

    if(level <= eLogLevel) {
        process.nextTick(AsynTask, level, message);
    }
}

Logger.LogSync = function (level, message) {

    if(level <= eLogLevel) {
        var sDateTime = new Date();
        var logLiteral = EnumLogLevel.properties[level].name;
        eventEmitter.emit('log', logLiteral, sDateTime.toISOString() + ' ' + logLiteral + ' ' + message + '\n');
    }
}

Logger.LogError = function(message) {

    if(EnumLogLevel.ERROR <= eLogLevel) {
        process.nextTick(AsynTask, EnumLogLevel.ERROR, message);
    }

}

Logger.LogErrorSync = function(message) {

    if(EnumLogLevel.ERROR <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'error', sDateTime.toISOString() + ' ' + 'error' + ' ' + message + '\n');
    }

}

Logger.LogWarn = function(message) {

    if(EnumLogLevel.WARN <= eLogLevel) {
        process.nextTick(AsynTask, EnumLogLevel.WARN, message);
    }

}

Logger.LogWarnSync = function(message) {

    if(EnumLogLevel.WARN <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'warn', sDateTime.toISOString() + ' ' + 'warn' + ' ' + message + '\n');
    }

}


Logger.LogInfo = function(message) {

    if(EnumLogLevel.INFO <= eLogLevel) {
        process.nextTick(AsynTask, EnumLogLevel.INFO, message);
    }

}

Logger.LogInfoSync = function(message) {

    if(EnumLogLevel.INFO <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'info', sDateTime.toISOString() + ' ' + 'info' + ' ' + message + '\n');
    }

}


Logger.LogVerbose = function(message) {

    if(EnumLogLevel.VERBOSE <= eLogLevel) {
        process.nextTick(AsynTask, EnumLogLevel.VERBOSE, message);
    }

}

Logger.LogVerboseSync = function(message) {

    if(EnumLogLevel.VERBOSE <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'verbose', sDateTime.toISOString() + ' ' + 'verbose' + ' ' + message + '\n');
    }

}

Logger.LogDebug = function(message) {

    if(EnumLogLevel.DEBUG <= eLogLevel) {
        process.nextTick(AsynTask, EnumLogLevel.DEBUG, message);
    }

}

Logger.LogDebugSync = function(message) {

    if(EnumLogLevel.DEBUG <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'debug', sDateTime.toISOString() + ' ' + 'debug' + ' ' + message + '\n');
    }

}


Logger.LogSilly = function(message) {

    if(EnumLogLevel.SILLY <= eLogLevel) {
        process.nextTick(AsynTask, EnumLogLevel.SILLY, message);
    }

}

Logger.LogSillySync = function(message) {

    if(EnumLogLevel.SILLY <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'silly', sDateTime.toISOString() + ' ' + 'silly' + ' ' + message + '\n');
    }

}

function ResolveSequenceNumber() {
    Logger.iCurrentFileSequence %= iMaxFileNumber;
    return Logger.iCurrentFileSequence++;
}

module.exports.Logger = Logger;
module.exports.eLogLevel = EnumLogLevel;

module.exports.LogSync = Logger.LogSync;
module.exports.LogErrorSync = Logger.LogErrorSync;
module.exports.LogWarnSync = Logger.LogWarnSync;
module.exports.LogInfoSync = Logger.LogInfoSync;
module.exports.LogVerboseSync = Logger.LogVerboseSync;
module.exports.LogDebugSync = Logger.LogDebugSync;
module.exports.LogSillySync = Logger.LogSillySync;

module.exports.Log = Logger.Log;
module.exports.LogError = Logger.LogError;
module.exports.LogWarn = Logger.LogWarn;
module.exports.LogInfo = Logger.LogInfo;
module.exports.LogVerbose = Logger.LogVerbose;
module.exports.LogDebug = Logger.LogDebug;
module.exports.LogSilly = Logger.LogSilly;

