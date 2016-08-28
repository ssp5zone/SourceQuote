var http = require('http');
var fs = require('fs');
var url = require('url');


// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{  
         //Page found   
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         var contentType="text/html";
         if (pathname.endsWith(".css")) {
            contentType="text/css";
         } else if (pathname.endsWith(".ttf")) {
            console.log("Font detected");
            contentType="application/octet-stream";
         }
         response.writeHead(200, {'Content-Type': contentType});
         
         // Write the content of the file to response body
         response.write(data.toString());   
      }
      // Send the response body 
      response.end();
   });   
}).listen(8787);

// Console will print the message
console.log('Server running at http://127.0.0.1:8787/');