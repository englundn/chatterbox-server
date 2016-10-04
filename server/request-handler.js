/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = [{
  username: 'Chatterbox',
  text: 'Welcome to Chatterbox!!',
  roomname: 'lobby'
}];


var requestHandler = function(request, response) {

  var statusCode = 404;

  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10
  };


  var headers = defaultCorsHeaders;
  var method = request.method;
  var urlValue = request.url;
  var url = require('url');
  var parsedUrl = url.parse(urlValue, true, true);
  var path = parsedUrl.pathname;


  headers['Content-Type'] = 'JSON';
  if ( path === '/classes/messages') {
    if (method === 'POST') {
      statusCode = 201;
      request.on('data', function(data) {
        messages = messages.concat(JSON.parse(data));
      });
    }
    if (method === 'GET' || method === 'OPTIONS') {
      statusCode = 200;
    }
  }
 
  response.writeHead(statusCode, headers);

  //Allow static file access
  var fs = require('fs');
  var index;
  fs.readFile('/Users/student/Desktop/2016-09-chatterbox-server/client/client/index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
    response.write(data);
    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      results: messages
    };



    response.end(JSON.stringify(responseBody));
  });

};


exports.requestHandler = requestHandler;






