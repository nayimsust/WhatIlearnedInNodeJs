
function Animal(name) {
  arguments.callee.count = ++arguments.callee.count || 1;
  Animal.static_variable = ++Animal.static_variable || 1;

  this.name = name
}

Animal.showCount = function() {
  console.log( Animal.count )
  console.log( Animal.static_variable);
}

var mouse = new Animal("Mouse")
var elephant = new Animal("elephant")

Animal.showCount()  // 
