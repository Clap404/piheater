"use strict";

exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex("sensor").del(),
        knex("heater_gpio").del(),
        knex("heater").del(),

        knex("sensor").insert({
            name: "10-000802a49ab7",
            alias: "bureau",
            descr: "Sonde de température du bureau",
        }),
        knex("sensor").insert({
            name: "10-000802a48880",
            alias: "entrée",
            descr: "Sonde de température de l'entrée",
        }),
        knex("sensor").insert({
            name: "10-000802a54a6e",
            alias: "haut",
            descr: "Sonde de température du haut",
        }),

        knex("heater").insert({
            id: 1,
            name: "heater_desktop",
            descr: "Radiateur du bureau",
        }),
        knex("heater_gpio").insert({
            heater_id: 1,
            pin: 11,
        }),
        knex("heater_gpio").insert({
            heater_id: 1,
            pin: 12,
        }),

        knex("heater").insert({
            id: 2,
            name: "heater_hall",
            descr: "Radiateur de l'entrée",
        }),
        knex("heater_gpio").insert({
            heater_id: 1,
            pin: 13,
        }),
        knex("heater_gpio").insert({
            heater_id: 1,
            pin: 15,
        })
    );
};
