"use strict";

exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("sensor", function(t) {
            t.increments().primary();
            t.string("name").notNull();
            t.string("alias").nullable();
            t.string("descr").nullable();
        })
        .createTable("heater", function(t) {
            t.increments().primary();
            t.string("name").notNull();
            t.string("descr").nullable();
            t.integer("pin1").notNull();
            t.integer("pin2").notNull();
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable("sensor")
        .dropTable("heater")
};
