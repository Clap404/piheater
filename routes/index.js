module.exports = function(app){
    var express = require("express");
    var router = express.Router();

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');
    var sensormodels = models.sensors;
    var SensorModel = sensormodels.Sensor;
    var HeaterModel = sensormodels.Heater;

    var get_sensor_dict = function(callback) {
        var STATIC_SENSORS = ["A200", "A240"];

        models.gpio.sensor.getSensors(STATIC_SENSORS).
            then(function(values){
                var sensor_dict = {};

                for(var i = 0; i < values.length; i++)
                {
                    sensor_id = STATIC_SENSORS[i];
                    sensor_dict[sensor_id] = values[i];
                }

                callback(sensor_dict);
            });
    };

    var get_heater_dict = function(callback){
        var STATIC_HEATERS = {
            pouet1: {alias: "pouet1", pins: [11, 12]},
            pouet2: {alias: "pouet2", pins: [13, 15]},
        };

        var pins_lst = [];
        for(var heater in STATIC_HEATERS)
            pins_lst.push(STATIC_HEATERS[heater].pins);
        var heaters = Object.keys(STATIC_HEATERS);

        models.gpio.heater.getHeaters.apply(this, pins_lst).
            then(function(modes){
                var heater_lst = [];

                for(var i = 0; i < modes.length; i++)
                {
                    heater_db = STATIC_HEATERS[heaters[i]];
                    heater = {"alias": heater_db.alias, "mode": modes[i]};
                    heater_lst.push(heater);
                }

                callback(heater_lst);
            });

    }

    router.get("/api/sensor", function(req, res, next){
        get_sensor_dict(function(sensor_dict){
            res.json(sensor_dict);
        });
    });

    router.get("/api/heater", function(req, res, next){
        get_heater_dict(function(heater_lst){
            res.json(heater_lst);
        });
    });

    /* GET home page. */
    router.get("/", function(req, res, next) {
        get_sensor_dict(function(sensor_dict){
            temparg = {
                title: "Express",
                sensor: sensor_dict,
            };

            get_heater_dict(function(heater_lst){
                temparg["heater"] = heater_lst;
                res.render("index", temparg);
            })
        });
    });

    /* Testing page */
    router.get('/test', function(req, res, next) {
        new HeaterModel().fetchAll().then(function(collect){
            console.log(collect.at(0));
        });
    });

    return router;
};
