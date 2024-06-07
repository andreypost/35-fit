#!/bin/bash

echo "Building API"
cd ./api
npm install --frozen-lockfile
echo "No build step for API"

echo "Building Nest API"
cd ./nest-api
npm install --frozen-lockfile
npm run build
npm run start:prod
