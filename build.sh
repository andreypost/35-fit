#!/bin/bash

echo "Building API"
cd ./api
npm install ci
echo "No build step for API"

echo "Building Nest API"
cd ./nest-api
npm install ci
npm run build

echo "Running tests"
cd ./nest-api
npm run test:cov
if [ $? -ne 0 ]; then
  echo "Tests failed. Exiting..."
  exit 1
fi

echo "Starting Nest API in production mode"
npm run start:prod
