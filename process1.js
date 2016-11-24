

// example 1;
// console.log(process.argv);
// console.log(process.argv[1]);

// process.stdout.write("hi how are you\n");


//example 2

// var count = 0;
// setInterval(function callback() {

// 	++count;
// 	if(count > 10) {
// 		process.exit();
// 	}
// 	console.log("hello berry");
// }, 1000);



// exmaple 3
// var exec = require("child_process").exec;

// exec("cat process1.js", function (err, stdout, stderr) {
// 	console.log("catted command output is " + stdout);
// })


// example 4
var spawn = require('child_process').spawn

var bears = 0

bears += 1

if (process.argv[2] === 'child') {
  console.log("hello from child");
  console.log("rolling stone");
  //console.log('child', bears)
} else {
  var child = spawn(process.execPath, [__filename, 'child']);
  child.stdout.on('data', function (data) {

  	console.log("get from child", data.toString());
  })
  //console.log('parent', bears)
  //child.stdout.pipe(process.stdout)
}





