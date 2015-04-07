module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');
    var sensormodels = models.sensors;
    var SensorModel = sensormodels.Sensor;
    var TypeSensorModel = sensormodels.TypeSensor;

    /* Testing page */
    router.get('/test', function(req, res, next) {
        var test_type_sensor = new TypeSensorModel({name: 'test'}).save().
            then(function(type_sensor){
                var test_sensor = new SensorModel({
                    name: 'test_sensor',
                    descr: 'Testing sensor',
                    gpio: 11,
                    type_sensor_id: test_type_sensor.id,
                }).save().
                    then(function(sensor){
                        res.render(
                            'test',
                            { title: 'Express',
                              sensor: sensor.get("name") }
                        );
                    });
            });
    });

    router.get('/', function(req, res, next) {
        res.render(
            'index',
            { title: 'Express', },
        );
    });

    return router;
};
