/* Import node's http module: */
var http = require("http");
var reqHandler = require("./request-handler.js");
var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer();


var app = express();
var router = express.Router();


var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Chatterbox Server app listening at http://%s:%s', host, port);
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/send', function (req, res, next) {
  //var data = JSON.parse(req.body);
  console.log(req.body);
  //data.createdAt = new Date();
  //messages.push(data);
  res.status(201);
})


app.get('/classes/messages', function (req, res, next) {
  res.status(200);
  res.json({results: messages});
  next();
});

app.get('/log', function (req, res, next) {
  res.status(200);
  res.send("This is an amazing Log!");
  next();
});

app.get('/classes/:room', function (req, res, next) {
  //res.send('You are in room ' + req.params.room);
  var filtered = filterMessagesByRoom(req.params.room);
  res.json({results: filtered});
  res.status(200)
});

var messages = [
  { roomname: 'lobby', username: 'abcd', text: 'How are you?', createdAt: 'Tue, 27 Oct 2015 14:54:07 GMT'},
  { roomname: 'lobby', username: 'xyz', text: 'Great!', createdAt: 'Tue, 27 Oct 2015 14:54:13 GMT'},
  { roomname: 'room1', username: 'xyz', text: 'How are you?', createdAt: 'Tue, 27 Oct 2015 14:54:18 GMT'},
  { roomname: 'room1', username: 'abcd', text: 'Great!', createdAt: 'Tue, 27 Oct 2015 14:54:22 GMT'},
  { roomname: 'room32', username: 'xyz', text: 'How are you?', createdAt: 'Tue, 27 Oct 2015 14:54:28 GMT'},
  { roomname: 'room32', username: 'abcd', text: 'Tired of you asking!', createdAt: 'Tue, 27 Oct 2015 14:54:35 GMT'}
];

var filterMessagesByRoom = function (room) {
  return _.filter(messages, function (val) {
    if (val.roomname === room) {
      return val;
    }
  })
}

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// // ports are 8080 and 1337.
// var port = 3000;

// // For now, since you're running this server on your local machine,
// // we'll have it listen on the IP address 127.0.0.1, which is a
// // special address that always refers to localhost.
// var ip = "127.0.0.1";



// // We use node's http module to create a server.
// //
// // The function we pass to http.createServer will be used to handle all
// // incoming requests.
// // After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(reqHandler.requestHandler);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

