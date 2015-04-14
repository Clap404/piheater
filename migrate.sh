#!/bin/bash
mkdir -p db
cd models
../node_modules/.bin/knex migrate:latest
../node_modules/.bin/knex seed:run
