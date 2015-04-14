#!/bin/bash
mkdir -p db
cd models
node ../node_modules/knex/lib/bin/cli.js migrate:latest
node ../node_modules/knex/lib/bin/cli.js seed:run
