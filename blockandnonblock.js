

var filemodule = require("fs");

var file = filemodule.readFileSync("data.txt");

console.log(file.toString());

console.log("blocking Programm ended");




var file2 = filemodule.readFile("data.txt", function (err, data) {
	if(err) 
		return console.error(err);

	console.log("call back method fired");
	console.log(data.toString());
});

console.log("non blocking programm exit");




console.log(__dirname);