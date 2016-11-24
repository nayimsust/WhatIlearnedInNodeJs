var m2 = require("underscore");
//m2();
//console.log(m2);


function say(word) {
	console.log(word);
}


function sayAgain(functionSay, word) {
	functionSay(word);
}


function returnMe(param1, param2) {
	return param1 + param2;
}


console.log(returnMe(4, 5));


var httpRequestCounter = 0;

//sayAgain(say, "nazmul");


sayAgain(function (hello) { 
	console.log(hello);
	}, "goody"
);


function onRequest(request, response) {

	console.log("request accepted");
	//console.log(request);
	//response.write("hi");
	
	response.write("you are client number " + (++httpRequestCounter) );
	response.end();

}

var http = require("http");
// var server = http.createServer(
// 	function(request, response) {

// 		console.log("request accepted");
// 		//console.log(request);
// 		//response.write("hi");
		
// 		response.write("you are client number " + (++httpRequestCounter) );
// 		response.end();

// 	}
// );
// server.listen(3000);

var server2 = http.createServer(onRequest);
server2.listen(56565);



