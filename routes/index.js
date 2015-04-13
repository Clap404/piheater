module.exports = function(app){
    var express = require("express");
    var router = express.Router();
    var Promise = require("bluebird");

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');
    var sensormodels = models.sensors;
    var SensorModel = sensormodels.Sensor;
    var HeaterModel = sensormodels.Heater;

    function get_sensor_dict(){

        return models.gpio.sensor.getSensorList()
            .then(function(sensor_list){
                return models.gpio.sensor.getSensors.apply(this, sensor_list)
                    .then(function(values){
                        var sensor_dict = {};

                        for(var i = 0; i < values.length; i++)
                        {
                            sensor_id = sensor_list[i];
                            sensor_dict[sensor_id] = values[i];
                        }

                        return sensor_dict ;
                    });
            });
    };

    function get_heater_dict(){
        //STATIC_HEATERS = retour de la db dans un then
        var STATIC_HEATERS = {
            rad1: {name: "pouet1", pins: [11, 12]},
            rad2: {name: "pouet2", pins: [13, 15]},
        };

        var heater_dict = STATIC_HEATERS;

        //on a besoin de la lliste des pins pour demander le status a
        //model.gpio.heater
        var pins_lst = [];
        for(var heater in heater_dict)
            pins_lst.push(heater_dict[heater].pins);

        var heaters = Object.keys(heater_dict);

        //ce qui suit sera a mettre dans un then après un appel a la DB
        return models.gpio.heater.getHeaters.apply(this, pins_lst)
            .then(function(modes){

                for(var i = 0; i < modes.length; i++)
                    heater_dict[heaters[i]].mode = modes[i];

                return heater_dict ;
            });

    }

    router.get("/api/sensor", function(req, res, next){
        get_sensor_dict()
            .then(function(sensor_dict){
                res.json(sensor_dict);
            });
    });

    router.get("/api/heater", function(req, res, next){
        get_heater_dict()
            .then(function(heater_lst){
                res.json(heater_lst);
            });
    });

    var Promise = require('bluebird');

    /* GET home page. */
    router.get("/", function(req, res, next) {
        var p_s_d = get_sensor_dict();
        var p_h_d =  get_heater_dict();
        Promise.join(p_s_d, p_h_d, function(sensor_dict, heater_dict){
            temparg = {
                title: "Express",
                sensor: sensor_dict,
                heater: heater_dict,
            };

            res.render("index", temparg);
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
