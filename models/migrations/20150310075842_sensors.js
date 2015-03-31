"use strict";

exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("type_sensor", function(t) {
        t.increments().primary();
        t.string("name").notNull();
    })
    .createTable("sensor", function(t) {
        t.increments().primary();
        t.string("name").notNull();
        t.string("descr").nullable();
        t.integer("gpio").notNull();
        t.integer('type_sensor_id').references('type_sensor.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable("type_sensor")
        .dropTable("sensor");
};
