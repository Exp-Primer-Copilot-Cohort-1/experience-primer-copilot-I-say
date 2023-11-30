// Create web server
// Run: node comments.js
// Then: http://localhost:8080/

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var path = url.parse(request.url).pathname;
  var query = url.parse(request.url).query;

  if (path == '/submit') {
    var query = querystring.parse(url.parse(request.url).query);
    var name = query['name'];
    var comment = query['comment'];
    var data = name + ' said: ' + comment + '\n';

    fs.appendFile('comments.txt', data, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }

  fs.readFile('comments.txt', function(err, data) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(data);
    response.end();
  });
});

// Listen on port 8080, IP defaults to
