module.exports = function(app){
    var express = require("express");
    var router = express.Router();

    var models = app.get("models");

    router.get("/sensor", function(req, res, next){
        res.json({A200: 23, A240: 23.5});
    });

    router.get("/heater", function(req, res, next){
        var STATIC_HEATERS = {
            pouet1: {alias: "pouet1", pins: [11, 12]},
            pouet2: {alias: "pouet2", pins: [13, 15]},
        };

        var heater_dict = {};
        // for(var heater in CONST_HEATERS)
        // {
        //     var alias = STATIC_HEATERS[heater].alias;
        //     var hpins = STATIC_HEATERS[heater].pins;
        //     models.gpio.getHeater([hpins[0], hpins[1]).
        //         then(function(mode){
        //             heater_dict[heater] = {"alias": alias, "mode": mode};
        //         });
        // }
        res.json(heater_dict);
    });

    return router;
};
