
// Requires
var config = require('./config')
  , express = require('express')
  , http = require('http')
  , Wigslace = require('./wigslace');

// Set up the server
var app = express()
  , server = http.createServer(app);


// Instantiate the core class
var wl = new Wigslace(app);

// Catch all requests to the server and route them via the Wigslace object
app.all('/*', function(req, res) {
	wl.routeRequest(req, res);
});

// Start the server
server.listen(config.server.port);
