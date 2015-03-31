#!/bin/bash
mkdir -r db
cd models
knex migrate:latest
