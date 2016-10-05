/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require('fs');
var url = require('url');


var messages = [{
  username: 'Chatterbox',
  text: 'Welcome to Chatterbox!!',
  roomname: 'lobby'
}];
//


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
  var parsedUrl = url.parse(urlValue, true, true);
  var path = parsedUrl.pathname;
  var appRoot = process.cwd();
  

  var responseBody = {
    headers: headers,
    method: method,
    url: urlValue,
    results: messages
  };

  var paths = {
    '/messages': function(request, response) {
      if (method === 'POST') {
        statusCode = 201;
        request.on('data', function(data) {
          messages = messages.concat(JSON.parse(data));
        });
      }

      if (method === 'GET' || method === 'OPTIONS') {
        statusCode = 200;
      }

      headers['Content-Type'] = 'JSON';

      fs.readFile('' + appRoot + '/../client/client/index.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }

        // console.log(data);
        response.writeHead(statusCode, headers);
        response.write(data);
        response.end(JSON.stringify(responseBody));
        
      });

    },

    '/styles/styles.css': function(request, response) {
      fs.readFile('' + appRoot + '/../client/client' + path, 'utf8', function(err, file) {
        if (err) {
          console.log(err);
        }
        console.log('styles being run');
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(file);
        response.end();
      });
    }

    

  };


  if ( paths[path] ) {
    paths[path](request, response);
  } else {
    console.error('path does not exist');
    console.log(urlValue);
  }
 


};


exports.requestHandler = requestHandler;






