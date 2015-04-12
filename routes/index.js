module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');
    var sensormodels = models.sensors;
    var SensorModel = sensormodels.Sensor;
    var HeaterModel = sensormodels.Heater;

    /* Testing page */
    router.get('/test', function(req, res, next) {
        new HeaterModel().fetchAll().then(function(collect){
            console.log(collect.at(0));
        });
    });

    router.get('/', function(req, res, next) {
        res.render(
            'index',
            { title: 'Express', }
        );
    });

    return router;
};
