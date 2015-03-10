var http = require('http');

var http_port = 8000;

var start = function(router){
    var server = http.createServer(router.router);
    server.listen(http_port);
    console.log('listening to http://localhost:' + http_port);
};
exports.start = start;
