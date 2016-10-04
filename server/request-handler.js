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


  // The outgoing status.
  var statusCode = 404;

  // See the note below about CORS headers.
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
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


  var responseBody = {
    headers: headers,
    method: method,
    url: url,
    results: messages
  };


  // console.log(messages);
  response.end(JSON.stringify(responseBody));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;