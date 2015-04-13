module.exports = function(app){
    var express = require("express");
    var router = express.Router();
    var Promise = require("bluebird");

    var bookshelf = app.get('bookshelf');
    var models = app.get('models');
    var sensormodels = models.sensors;
    var SensorModel = sensormodels.Sensor;
    var HeaterModel = sensormodels.Heater;

    /**
     * Get a object of sensors
     *
     * Fetch all the sensors in the database, get them modes and return it for
     * the view
     */
    function get_sensor_dict(){
        return new SensorModel().fetchAll().
            then(function(collection){
                var sensors = collection.toJSON();

                sensors_id = []
                for(var i in sensors)
                    sensors_id.push(sensors[i].name);

                var structure_for_view = function(values){
                    var sensor_dict = {};
                    for(var i = 0; i < values.length; i++)
                    {
                        var sensor_id = sensors_id[i];
                        sensor_dict[sensor_id] = sensors[i];
                        sensor_dict[sensor_id].value = values[i];
                        delete sensor_dict[sensor_id].id;
                    }

                    return sensor_dict;
                }

                return models.gpio.sensor.getSensors.apply(this, sensors_id)
                    .then(function(values){
                        return structure_for_view(values)
                    })
                    .catch(function(){
                        var values = [];
                        for(var i in sensors_id) values.push(-1);
                        return structure_for_view(values);
                    });
            });
    };

    /**
     * Get an object of heaters
     *
     * Fetch all the heaters in the database, get them modes and return it for
     * the view
     */
    function get_heater_dict(){
        return new HeaterModel().fetchAll().
            then(function(collection){
                var heaters = collection.toJSON();
                var pins_lst = [];
                for(var i in heaters)
                    pins_lst.push([heaters[i].pin1, heaters[i].pin2]);

                return models.gpio.heater.getHeaters.apply(this, pins_lst)
                    .then(function(modes){
                        heater_dict = {}
                        for(var i = 0; i < modes.length; i++)
                        {
                            var heater_id = heaters[i].id;
                            heater_dict[heater_id] = heaters[i];
                            heater_dict[heater_id].mode = modes[i];
                            delete heater_dict[heater_id].pin1;
                            delete heater_dict[heater_id].pin2;
                            heater_dict[heater_id].pins = pins_lst[i];
                        }

                        return heater_dict;
                    });
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
