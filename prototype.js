

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
	}

}


var sust = new Sust("NAZMUL", "54", "software");

// sust.SayHello();

// sust.SayHello = function () {
// 	console.log("say hello");
// }

// sust.SayHello();


// sust.SayGoodNight();

Sust.prototype.SayGoodNight = function() {
	console.log("good night los angeles");
}

sust.SayGoodNight();

