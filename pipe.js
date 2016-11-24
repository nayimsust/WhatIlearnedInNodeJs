
// example 1.
// var net = require('net');

// var server = net.createServer(function (socket) {
//   socket.write('Echo server\r\n');
//   socket.pipe(socket);
// });


// var net = require('net');
// net.createServer(function (socket) {
//   socket.write('Echo server\r\n');
//   socket.on('data', function(chunk) {
//     socket.write(chunk);
//   });
//   socket.on('end', socket.end);
// });


// example 2.
// var fs = require("fs");
// var data = '';

// // Create a readable stream
// var readerStream = fs.createReadStream('input.txt');

// // Set the encoding to be utf8. 
// readerStream.setEncoding('UTF8');

// // Handle stream events --> data, end, and error
// readerStream.on('data', function(chunk) {
// 	console.log('hi');
//    data += chunk;
// });

// readerStream.on('end',function(){
//    //console.log(data);
// });

// readerStream.on('error', function(err){
//    console.log(err.stack);
// });

// console.log("Program Ended");



// example 3.

// var fs = require("fs");

// // Create a readable stream
// var readerStream = fs.createReadStream('input.txt');

// // Create a writable stream
// var writerStream = fs.createWriteStream('output.txt');

// // Pipe the read and write operations
// // read input.txt and write data to output.txt
// readerStream.pipe(writerStream);

// console.log("Program Ended");

// example 4.
var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("File Compressed.");





