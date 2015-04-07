'use strict';

var gpio = require("pi-gpio-promise");
var Promise = require("bluebird");

var MODE = {
    "eco" : [0, 0],
    "on"  : [1, 1],
    "off" : [1, 0],
    "min" : [0, 1],
}

var RMODE = {
    0 : "eco",
    3 : "on" ,
    2 : "off",
    1 : "min",
}

function setHeater( pin_1, pin_2, mode ) {
    if (Object.keys( MODE ).indexOf( mode ) !== -1) {
        var p_pin_1 = gpio.write(pin_1, MODE[mode][0]);
        var p_pin_2 = gpio.write(pin_2, MODE[mode][1]);
        return Promise.join(p_pin_1, p_pin_2, function(){});
    }
    else {
        throw "unknown mode : " + mode;
    }
}

function getHeater( pin_1, pin_2 ) {
    var p_pin_1 = gpio.read(pin_1);
    var p_pin_2 = gpio.read(pin_2);
    return Promise.join(p_pin_1, p_pin_2, function(val_pin_1, val_pin_2){
        var mode = RMODE[val_pin_1*2 + val_pin_2];
        return mode;
    });
}

module.exports = {
    setHeater : setHeater,
    getHeater : getHeater,
}
