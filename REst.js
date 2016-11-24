var express = require('express');
var url = require('url');
var app = express();
var fs = require("fs");



app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
});



app.get('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
});


// app.get('/:id', function (req, res) {
//    // First read existing users.
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       data = JSON.parse( data );
//       var user = users["user" + req.params.id] 
//       console.log( user );
//       res.end( JSON.stringify(user));
//    });
// });

// app.get('/deleteUser', function (req, res) {
//    // First read existing users.
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       data = JSON.parse( data );
//       delete data["user" + 2];
       
//       console.log( data );
//       res.end( JSON.stringify(data));
//    });
// });


function getUserId(req, res) {

   console.log('getUserId', ' start');

   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {

      console.log('readfile', 'start');

      data = JSON.parse( data );

      var url_parts = url.parse(req.url);
      //console.log(url_parts);
      //console.log(url_parts.pathname);

      //	parse the params from uri
      var action = req.query.action;
      var id = req.query.id;

      //console.log(action, "::", id);
      var result = data[id];
      //console.log(result);

      if(result == undefined) {
         //console.log("password not found");
         res.end("");
      }
      else  {
         var sendResponse = '{\"natUserKey\":\"' + result.password + "\"}";
         res.end( sendResponse );
      }

      console.log('readfile', 'end');
   });


   console.log('getUserId', ' end');
}

function readUserFile(err, data) {

   data = JSON.parse( data );

   var url_parts = url.parse(req.url);
   console.log(url_parts);
   console.log(url_parts.pathname);

   //	parse the params from uri
   var action = req.query.action;
   var id = req.query.id;

   //console.log(action, "::", id);
   var result = data[id];
   console.log(result);

   if(result == undefined) {
      //console.log("password not found");
      res.end("");
   }
   else  {
      var sendResponse = '{\"natUserKey\":\"' + result.password + "\"}";
      res.end( sendResponse );
   }

}


//http://127.0.0.1/api.php?action=get_app&id=tyryr
// app.get('/api.php', function (req, res) {
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//
//       data = JSON.parse( data );
//
//       var url_parts = url.parse(req.url);
// 		 console.log(url_parts);
// 		 console.log(url_parts.pathname);
//
//       //	parse the params from uri
//       var action = req.query.action;
//       var id = req.query.id;
//
//       //console.log(action, "::", id);
//       var result = data[id];
//       console.log(result);
//
//       if(result == undefined) {
//       	//console.log("password not found");
//       	res.end("");
//       }
//       else  {
//       	var sendResponse = '{\"natUserKey\":\"' + result.password + "\"}";
//       	res.end( sendResponse );
//       }
//    });
// });


app.get('/api.php', getUserId);

var server = app.listen(8000, 'localhost',function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});


for(var i = 0; i < 10; i++) {
   setTimeout(function() {
      console.log(i);
   }, 1000);
}




for(var i = 0; i < 10; i++) {
   (function(){
      var i2 = i;
      setTimeout(function(){
         console.log(i2);
      }, 1000)
   })();
}





