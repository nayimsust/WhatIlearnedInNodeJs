/**
 * Created by nazmul on 9/15/16.
 */



var events = require('events');
var util = require('util');
var fs = require('fs');

var EnumLogLevel = {
    ERROR: 0,
    INFO: 1,
    DEBUG: 2,
    WARN: 3,
    VERBOSE: 4,
    SILLY: 5,
    properties:{
        0: {name: "error", value: 0, code: "ER"},
        1: {name: "info", value: 1, code: "IF"},
        2: {name: "debug", value: 2, code: "DB"},
        3: {name: "warn", value: 3, code: "WN"},
        4: {name: "verbose", value: 4, code: "VB"},
        5: {name: "silly", value: 5, code: "SL"}
    }
};


//  must read the attributes from configuration file.
const iBytesInMB = (1 << 20);
var sConfigureFile = "";    //  default value
var iMaxFileNumber = 100; // afs default setting
var iMaxFileSize = iBytesInMB * 10; // 10 MB (afs default setting)
var sLogFilePath = "./";  //  default value
var sLogFileName = "Auth_Server.log";  //  default value
var eLogLevel = -1;     //  default value

// read the logging settings from the configure file
function parseConfigureFile(logLevel, fileName) {

    var array = fs.readFileSync(fileName).toString().split("\n");
    for(line in array) {
        var trimmedLine = array[line].toString().trim();
        if (trimmedLine.substr(0, 'auth_server_enable_log'.length) === 'auth_server_enable_log') {
            var propertyArray = trimmedLine.split('=');
            if (propertyArray.length >= 2) {
                if (propertyArray[1].toString().trim().toLowerCase() == 'yes')
                    eLogLevel = logLevel;
                else {
                    eLogLevel = -1;
                    break;
                }
            }
            else {
                eLogLevel = -1;
                break;
            }
        }

        else if(trimmedLine.substr(0, 'auth_server_log_level'.length) === 'auth_server_log_level') {
            var propertyArray = trimmedLine.split('=');
            if (propertyArray.length >= 2) {
                var sLogLevel = propertyArray[1].toString().trim().toLowerCase();
                if (sLogLevel == 'no') {
                    eLogLevel = -1;
                    break;
                }
                else if(sLogLevel == 'error')
                    eLogLevel = 0;
                else if(sLogLevel == 'info')
                    eLogLevel = 1;
                else if(sLogLevel == 'debug')
                    eLogLevel = 2;
                else if(sLogLevel[0] == 'v') {
                    var iLogLevel = Number(sLogLevel.substr('v'.length));
                    if(iLogLevel >= EnumLogLevel.ERROR && iLogLevel <= (EnumLogLevel.DEBUG + 1))
                        eLogLevel = iLogLevel - 1;
                    else
                        eLogLevel = -1;
                    // console.log("log-level::v%d", eLogLevel+1);
                }
                else {
                    eLogLevel = -1;
                    break;
                }
            }
            else {
                eLogLevel = -1;
                break;
            }
        }

        else if (trimmedLine.substr(0, 'auth_server_log_file'.length) === 'auth_server_log_file') {
            var propertyArray = trimmedLine.split('=');
            if (propertyArray.length >= 2) {
                var sLogFile = propertyArray[1].toString().trim();
                var index = undefined;
                for(index = sLogFile.length-1; index >= 0; --index)
                    if(sLogFile[index] == '/') {
                        break;
                    }
                if(index != -1){
                    sLogFilePath = sLogFile.substr(0, index + 1);
                    sLogFileName = sLogFile.substr(index+1);
                    // console.log(sLogFile, "::", sLogFile);
                    if (!fs.existsSync(sLogFilePath)){   // create directory if its not exists.
                        try {
                            fs.mkdirSync(sLogFilePath);
                        }
                        catch(e) {
                            if(e.code == 'EPERM')
                                console.log('Can not create directory with exception ',e);
                        }
                    }
                    else {  //  remove all old log files.

                    }
                }
            }
        }

        else if (trimmedLine.substr(0, 'auth_server_log_max_file_size'.length) === 'auth_server_log_max_file_size') {
            var propertyArray = trimmedLine.split('=');
            if (propertyArray.length >= 2) {
                iMaxFileSize = Number(propertyArray[1].toString().trim()) * iBytesInMB;
                // console.log("logFileSize::", iMaxFileSize / iBytesInMB, "MB");
            }
        }

        else if (trimmedLine.substr(0, 'auth_server_log_max_file_count'.length) === 'auth_server_log_max_file_count') {
            var propertyArray = trimmedLine.split('=');
            if (propertyArray.length >= 2) {
                iMaxFileNumber = Number(propertyArray[1].toString().trim());
                // console.log("logFileNumber::", iMaxFileNumber);
            }
        }
    }
}


function parseArguments(options) {
    var iLogLevel = -1;

    if(options.conffile == undefined) {
        for (var i = 2; i < process.argv.length; i++) {
            if (process.argv[i].substr(0, '-v'.length) === '-v') { // verbose parsing
                iLogLevel = Number(process.argv[i].substr('-v'.length));

                if (iLogLevel >= EnumLogLevel.ERROR && iLogLevel <= (EnumLogLevel.DEBUG + 1))
                    iLogLevel = iLogLevel - 1;
                else
                    iLogLevel = -1;
                // console.log("verbose::", iLogLevel);
            }
            else if (process.argv[i] === '-c' && process.argv.length > (i + 1) && (process.argv[i + 1][0] == '.' || process.argv[i + 1][0] == '/')) {
                sConfigureFile = process.argv[i + 1];
                // console.log("configure file::", sConfigureFile);
            }
        }
    }
    else
        sConfigureFile = options.conffile;

    if(fs.existsSync(sConfigureFile)) // only procced if configure file exist
        parseConfigureFile(iLogLevel, sConfigureFile);
}

function format() {

    var sFormattedString = '';
    var iCurrentArgument = 0;

    //  handle format argument
    if (arguments.length > 0) {

        if (typeof arguments[0] == 'string') {
            sFormattedString = arguments[0];
            ++iCurrentArgument; // first argument is format so skip it

            for(var iIndex = 0; (iIndex = sFormattedString.indexOf('%', iIndex)) != -1;) {
                var iPlaceHolder = iIndex + 1; // place holder index indicate 's', 'd', 'j' or '%'
                if(sFormattedString.length > iPlaceHolder) {
                    if(sFormattedString[iPlaceHolder] == 's' || sFormattedString[iPlaceHolder] == 'd' || sFormattedString[iPlaceHolder] == 'j') {
                        if(iCurrentArgument < arguments.length) {
                            // var sConvertedPlaceHolder = sFormattedString[iPlaceHolder] == 'j' ? JSON.stringify(arguments[iCurrentArgument++]) : arguments[iCurrentArgument++];
                            var sConvertedPlaceHolder = typeof arguments[iCurrentArgument] == 'object' ? JSON.stringify(arguments[iCurrentArgument++]) : arguments[iCurrentArgument++];
                            sFormattedString = sFormattedString.substr(0, iIndex) + sConvertedPlaceHolder + sFormattedString.substr(iPlaceHolder + 1);
                            iIndex += sConvertedPlaceHolder.length;
                        }
                        else
                            break;  // insufficient argument to meet place holder.
                    }
                    else if(sFormattedString[iPlaceHolder] == '%') {
                        sFormattedString = sFormattedString.substr(0, iIndex + 1) + sFormattedString.substr(iPlaceHolder + 1);
                        ++iIndex;
                    }
                }
            }
        }

        while(iCurrentArgument < arguments.length) {
            sFormattedString += (sFormattedString.length != 0 ? ' ' : '') + (typeof arguments[iCurrentArgument] == 'string' ? arguments[iCurrentArgument++] : util.inspect(arguments[iCurrentArgument++], false, null));
        }
    }

    return sFormattedString;
}


function Logger() {

}


Logger.iCurrentFileSequence = 0;
Logger.iWrittenLength = 0;
Logger.sWriteBuffer = null;


var eventEmitter = new events.EventEmitter();
// listener #1
var listner1 = function log(level, message) {

    //console.log(level + "::" + message);

    if(Logger.sWriteBuffer == null || (Logger.sWriteBuffer != null && Logger.iWrittenLength >= iMaxFileSize)) {
        //  create new file because its the first time or its rotating
        Logger.iCurrentFileSequence %= iMaxFileNumber;
        var sFileName = sLogFilePath + sLogFileName + Logger.iCurrentFileSequence++;
        if (Logger.sWriteBuffer != null) {
            Logger.sWriteBuffer.end();  // close the write buffer.
        }
        if (fs.existsSync(sFileName))
            fs.unlinkSync(sFileName);   //  deleting the old file if exist.

        var options = {flags: 'w', defaultEncoding: 'utf8', mode: 0666, autoClose: false};
        Logger.sWriteBuffer = fs.createWriteStream(sFileName, options);
        Logger.iWrittenLength = 0;
    }

    Logger.sWriteBuffer.write(message);
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
    eventEmitter.emit('log', logLiteral, sDateTime + ' ' + logLiteral + ' ' + message + '\n');
}

Logger.PrintLogConfiguration = function() {
    Logger.LogSync(EnumLogLevel.INFO, "/********** server logging options **********/");
    Logger.LogSync(EnumLogLevel.INFO, "log-level:            v%d", eLogLevel+1);
    Logger.LogSync(EnumLogLevel.INFO, "logFile:              %s%s", sLogFilePath, sLogFileName);
    Logger.LogSync(EnumLogLevel.INFO, "logFileSize:         ", iMaxFileSize / iBytesInMB, "MB");
    Logger.LogSync(EnumLogLevel.INFO, "logFileNumber:       ", iMaxFileNumber);
    Logger.LogSync(EnumLogLevel.INFO, '');
}

Logger.init = function(options) {
    parseArguments(options);   // must call once to configure from config file
}

function getErrorObject(){
    try { throw Error('') } catch(err) { return err; }
}

Logger.Log = function (level, message) {

    if(level <= eLogLevel) {
        var args = Array.prototype.splice.call(arguments, 1);
        process.nextTick(AsynTask.bind(null, level, format.apply(null, args)));
    }
}

Logger.LogSync = function (level, message) {

    if(level <= eLogLevel) {
        var sDateTime = new Date();
        var logLiteral = "<" + EnumLogLevel.properties[level].name + ">";
        var args = Array.prototype.splice.call(arguments, 1);
        var stackTrace = arguments.callee.caller.name.toString();
        eventEmitter.emit('log', logLiteral, sDateTime + ' ' + logLiteral + ' ' + format.apply(null, args) + (stackTrace.length > 0 ? " at " + stackTrace : "") + '\n');
    }
}

Logger.LogError = function(message) {

    if(EnumLogLevel.ERROR <= eLogLevel) {
        process.nextTick(AsynTask.bind(null, EnumLogLevel.ERROR, format.apply(null, arguments)));
    }

}

Logger.LogErrorSync = function(message) {

    if(EnumLogLevel.ERROR <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'error', sDateTime + ' ' + 'error' + ' ' + format.apply(null, arguments) + '\n');
    }

}

Logger.LogWarn = function(message) {

    if(EnumLogLevel.WARN <= eLogLevel) {
        process.nextTick(AsynTask.bind(null, EnumLogLevel.WARN, format.apply(null, arguments)));
    }

}

Logger.LogWarnSync = function(message) {

    if(EnumLogLevel.WARN <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'warn', sDateTime + ' ' + 'warn' + ' ' + format.apply(null, arguments) + '\n');
    }

}


Logger.LogInfo = function(message) {

    if(EnumLogLevel.INFO <= eLogLevel) {
        process.nextTick(AsynTask.bind(null, EnumLogLevel.INFO, format.apply(null, arguments)));
    }

}

Logger.LogInfoSync = function(message) {

    if(EnumLogLevel.INFO <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'info', sDateTime + ' ' + 'info' + ' ' + format.apply(null, arguments) + '\n');
    }

}


Logger.LogVerbose = function(message) {

    if(EnumLogLevel.VERBOSE <= eLogLevel) {
        process.nextTick(AsynTask.bind(null, EnumLogLevel.VERBOSE, format.apply(null, arguments)));
    }

}

Logger.LogVerboseSync = function(message) {

    if(EnumLogLevel.VERBOSE <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'verbose', sDateTime + ' ' + 'verbose' + ' ' + format.apply(null, arguments) + '\n');
    }

}

Logger.LogDebug = function(message) {

    if(EnumLogLevel.DEBUG <= eLogLevel) {
        process.nextTick(AsynTask.bind(null, EnumLogLevel.DEBUG, format.apply(null, arguments)));
    }

}

Logger.LogDebugSync = function(message) {

    if(EnumLogLevel.DEBUG <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'debug', sDateTime + ' ' + 'debug' + ' ' + format.apply(null, arguments) + '\n');
    }

}


Logger.LogSilly = function(message) {

    if(EnumLogLevel.SILLY <= eLogLevel) {
        process.nextTick(AsynTask.bind(null, EnumLogLevel.SILLY, format.apply(null, arguments)));
    }

}

Logger.LogSillySync = function(message) {

    if(EnumLogLevel.SILLY <= eLogLevel) {
        var sDateTime = new Date();
        eventEmitter.emit('log', 'silly', sDateTime + ' ' + 'silly' + ' ' + format.apply(null, arguments) + '\n');
    }

}

function ResolveSequenceNumber() {
    Logger.iCurrentFileSequence %= iMaxFileNumber;
    return Logger.iCurrentFileSequence++;
}

function getLogLevel() {
    return eLogLevel;
}

module.exports.Logger = Logger;
module.exports.eLogLevel = EnumLogLevel;
module.exports.getLogLevel = getLogLevel;

module.exports.init = Logger.init;
module.exports.summarize = Logger.PrintLogConfiguration;

module.exports.logSync = Logger.LogSync;
module.exports.logErrorSync = Logger.LogErrorSync;
module.exports.logWarnSync = Logger.LogWarnSync;
module.exports.logInfoSync = Logger.LogInfoSync;
module.exports.logVerboseSync = Logger.LogVerboseSync;
module.exports.logDebugSync = Logger.LogDebugSync;
module.exports.logSillySync = Logger.LogSillySync;

module.exports.log = Logger.Log;
module.exports.logError = Logger.LogError;
module.exports.logWarn = Logger.LogWarn;
module.exports.logInfo = Logger.LogInfo;
module.exports.logVerbose = Logger.LogVerbose;
module.exports.logDebug = Logger.LogDebug;
module.exports.logSilly = Logger.LogSilly;

