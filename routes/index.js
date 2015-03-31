module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');
    var sensormodels = models.sensors;
    var SensorModel = sensormodels.Sensor;
    var TypeSensorModel = sensormodels.TypeSensor;

    /* GET home page. */
    router.get('/', function(req, res, next) {
        var test_sensor = new TypeSensorModel({name: 'test'}).save().
            then(function(obj){
                res.render(
                    'index',
                    { title: 'Express', sensor: obj.get("name") }
                );
            });
    });
    return router;
};
