#!/bin/bash
mkdir -p db
cd models
knex migrate:latest
