module.exports = function(app){
    var express = require("express");
    var router = express.Router();

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');
    var sensormodels = models.sensors;
    var SensorModel = sensormodels.Sensor;
    var HeaterModel = sensormodels.Sensor;

    /* GET home page. */
    router.get("/", function(req, res, next) {
        res.render( "index", {
            title: "Express",
            sensor: {A200: 23, A240: 23.5},
            heater: {"a010101":{"alias":"pouet","mode":"off"}},
        });
    });

    /* Testing page */
    router.get('/test', function(req, res, next) {
        new HeaterModel().fetchAll().then(function(collect){
            console.log(collect.at(0).get("gpio_id"));
        });
    });

    return router;
};
