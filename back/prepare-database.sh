#!/bin/bash

if [ -d dist ]; then
  echo "Deleting the 'dist' folder..."
  rm -rf dist
fi

echo "Initializing Sequelize, compiling TypeScript, and running migrations and seeds..."
npx sequelize-cli init && tsc && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all

echo "Database ready."
