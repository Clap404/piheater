"use strict";

exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex("sensor").del(),
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
            pin1: 11,
            pin2: 12,
        }),
        knex("heater").insert({
            id: 2,
            name: "heater_hall",
            descr: "Radiateur de l'entrée",
            pin1: 13,
            pin2: 15,
        })
    );
};
