

var args = { hello: 'world' };

function myFunction(args){
  args.hello = 'another world';
}

myFunction(args);
console.log(args.hello);


var options = {
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: fd,
  mode: 0o666,
  autoClose: false
};



// fs.createWriteStream('input', 'w', 'utf8', fd, 0o666, false);

fs.createWriteStream('input', options);