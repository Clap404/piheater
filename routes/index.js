module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render( 'index', { title: 'Express' });
    });
    return router;
};
