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
        })
        .createTable("heater_gpio", function(t) {
            t.increments().primary();
            t.integer("heater_id").references("heater.id");
            t.integer("pin").notNull();
            t.index(["heater_id", "pin"], "pk_heater_gpio");
        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable("sensor")
        .dropTable("heater")
        .dropTable("heater_gpio");
};
