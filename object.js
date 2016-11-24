



// in three way we can create java script object

//	1. object literal

var userAccount = {name:"nazmul", age:"32", job: "software engineer"};
console.log(userAccount.name);


//	2. java script new keyword

var dummyObject = new Object();
dummyObject.name = "nazmul";
dummyObject.age = 45;
dummyObject.job = "software engineer";
console.log(dummyObject.age);



// 3. object constructor

function User(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;

	console.log(this.name + " " + this.age + " " + this.job);
}


var user1 = new User("nazmul", 23, "software");
var user2 = new User("tahlil", 23, "software");
var user3 = new User("riyad", 23, "software");

user3.versity = "sust";

console.log(user3.versity);



//	some testing with object

var hiArray = ["a", "b", "c", "d"];
console.log(hiArray[0]);

//	java script object are call by reference
user1 = user2;
user2.name = "sephalo";

console.log(user1.name);


//	access properties differently in java script
console.log(user3["name"]);


//	show all properties in an object has

console.log("start showing all properties in a javascript object");
for( propertyname in user3) {
	//console.log(user3.propertyname);
	console.log(propertyname + ":" + user3[propertyname]);
}


//	deleting an object properties
delete user3.name;
console.log(user3.name);


//	custom object with function (fun begins)

function Sust(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this._job = "private_job";


	this.ShowName = function () {
		console.log(this.name);
	};

	this.Square = function (number) {
		return number * number;
	};

	this.GetPrivateJob = function () {
		return this._job;
	}

	this.SetPrivateJob = function(newjob) {
		this._job = newjob;
	};

}


var sust = new Sust("NAZMUL", "54", "software");
//console.log(sust.name);
sust.ShowName();

sust.SayHello = function () {
	console.log("say hello");
}

sust.SayHello();

//	using built in method
var company = "anyconnect limited";
var companys = company.toUpperCase();
console.log(companys);


//sust.SayGoodNight();

Sust.prototype.SayGoodNight = function() {
	console.log("good night los angeles");
}

sust.SayGoodNight();


// some great confusion in java script

function Hello() {
	console.log("say hello buddy");
	return "hi";
}

var hi = Hello();
console.log(hi);


//	private member varibale testing
console.log("private member variable testing start");

console.log(sust._job);

console.log(sust.GetPrivateJob());



function Just (name, age) {

	var iCount = 0;
	this.name = name;
	this.age = age;

	this.GetCount = function () {
		Increment();
		return iCount;
	};

	function Increment() {
		++iCount;
	};
}

function squareAdd(a, b) {
	square(a, b);
	return (a + b);
}

function square(a, b) {
	a *= a;
	b *= b;
}


var c = 2;
var d = 3;

console.log(squareAdd(c, d));

console.log(c + " " + d);

c = d;

c = 34;

console.log(c);


var just1 = new Just("nazmul", "28");
var just2 = new Just("noman", "34");

just1 = just2;

just1.name = "robel";

delete Just.name;

var just3 = new Just("rasel", "4");

console.log(just3.name);



console.log("object creation start");

function Nazmul(name) {
	this.name = name;
}

Nazmul.prototype.sayHello = function () {
	console.log("say hello mister");
}

var hello = new Nazmul("directv");
console.log(hello.sayHello())






