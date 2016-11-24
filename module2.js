
var a = 1;
var b = 2;
var sString = "hellodear";

var oA = {name:"nazmul", id: 0};


module.exports = function() {

	console.log("i am in function in moudle2");
}

module.exports.changeA = function(new_a) {
	a = new_a;
	console.log("new value is", a);
}

module.exports.changeObject = function(name, id) {
	oA.name = name;
	oA.id = id;
	console.log("new value is", oA.name, oA.id);
}

module.exports.changeString = function(str) {
	sString = str;
	console.log("new value is", sString);
}



module.exports.showA = function() {
	console.log("value is", a);
}

module.exports.showObject = function() {
	console.log("value is", oA.name, oA.id);
}


module.exports.showString = function() {
	console.log("value is", sString);
}


module.exports.alu = a;
module.exports.b = b;
module.exports.ObjectAlu = oA;
module.exports.sampleString = sString;
