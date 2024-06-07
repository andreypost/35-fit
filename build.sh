#!/bin/bash

echo "Building API"
cd ./api
npm install --frozen-lockfile
echo "No build step for API"

echo "Building Nest API"
cd ./nest-api
npm install --frozen-lockfile
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
