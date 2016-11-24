//get the filesystem module

var fs = require('fs');
var array = fs.readFileSync('./input.txt').toString().split("\n");
for(i in array) {
    console.log(array[i]);
}


console.log(process.argv[0]);
if(process.argv[0][0] == '/')
  console.log("hi");

