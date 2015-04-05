'use strict';

var temp = require("ds18b20-promise");
var Promise = require("bluebird");

function getSensor( sensor_id ) {
    return temp.temperature( sensor_id );
}

function getSensorList() {
    return temp.sensors();
}

function getAllSensors() {

    return getSensorList()
        .then(function(sensor_list){

            var temps=[];

            for (var i=0; i < sensor_list.length; ++i) {
                temps.push(getSensor( sensor_list[i] ));
            }

            return Promise.all(temps)
                .then(function(temps){
                    var sensor_temp = {};
                    for (var i=0; i < sensor_list.length; ++i) {
                        sensor_temp[sensor_list[i]] = temps[i];
                    }
                    return sensor_temp;
                });
        });
}

module.exports = {
    getSensor : getSensor,
    getSensorList : getSensorList,
    getAllSensors : getAllSensors,
}
