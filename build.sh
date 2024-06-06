#!/bin/bash

echo "Building API"
cd ./api
echo "No build step for API"
cd ..

echo "Building Nest API"
cd ./nest-api
npm install --frozen-lockfile
npm run build
