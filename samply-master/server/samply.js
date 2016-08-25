'use strict';


const server = require('http').createServer();

const Road   = require('road');

let SharedData = {
  paths: {
    public_resources: '../client',
    root_view: '../client/views/sampler.html'
  }
};

const roads = [
  require('roads/static'),
  require('roads/root')
];


const handle_request = (request, response) => {
  console.log(`\n${request.method} ${request.url}`);
  Road.properRoad(request.url, roads)
      .then( road => {
        //Check if a road was selected for taking the request
        if (road === null) {
          //return 404!
          response.writeHead(404, {'content-type': 'text/plain'});
          response.end(`Resource ${request.url} not found.`);
        }

        //select controller!
        if (road.query.allowed_methods.indexOf(request.method) < 0) {
          response.writeHead(405, {'content-type': 'text/plain'});
          response.end(`Method ${request.method} not allowed on ${request.url}`);
        }

        setImmediate(road.controllers[request.method],
                    {request, response, shdata: SharedData, sign: road.sign});

        return {
          success:             true,
          road:                road.alias,
          executed_controller: request.method
        }

      })
      //.catch( err => {
        //console.log(`[ERROR] ${err}`);
      //});
}

server.on('request', handle_request);
server.listen(1337, '127.0.0.1');
console.log('[server] Listening to incoming connections.');
