var Router = require('node-simple-router');
var router = Router();

router.get("/", function(request, response) {
    response.end("Hello, World!");
});

exports.router = router
