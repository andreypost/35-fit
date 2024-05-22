# 35-fit

This repository contains instructions and scripts for setting up and deploying the 35-fit project.

## Installation

Ensure you have Node Version Manager (nvm) installed on your system. Then, run the following commands:

```bash
nvm list # Check available Node.js versions
nvm current # Check current Node.js version
nvm use 16.--.- # Use Node.js version 16.--.-



npm i # Install dependencies
npm ci # Install dependencies without changing package-lock.json (if exists)

npm install --frozen-lockfile
yarn install --frozen-lockfile

# root dir
sudo nano /etc/postgresql/16/main/pg_hba.conf # ubuntu to edit config file
sudo nano /usr/local/var/postgresql@15/pg_hba.conf # mac to edit config file

psql -U andrii -d postgres -W # or
psql postgres # connect to PostgreSQL using the postgres database, use password
psql -U andrii -d fitdb -W # or
psql fitdb # connect to PostgreSQL using the fitdb database, use password

sudo -u postgres psql # ubuntu, enter to postgres db with ubuntu user (andrii) and pass


\l # list database
CREATE DATABASE fitdb;
\c fitdb # connect to database
\du # list all users
\dt # list all tables
\q # quit terminal

# database
SELECT * FROM "Users";

# cd api
node server # start express


# cd headless

npm run firebase-login # or npx firebase login
npm run firebase-init # or npx firebase init
# Follow the prompts:
# - Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
# - Please select an option: Use an existing project
# - Select a default Firebase project for this directory: fit-35 (35-fit)
# - What do you want to use as your public directory? build
# - Configure as a single-page app (rewrite all urls to /index.html)? Yes
# - Set up automatic builds and deploys with GitHub? No
# - File build/index.html already exists. Overwrite? No
# - Firebase initialization complete!

npm start # Start the project

npm run lint
# this command runs script field "lint": "eslint src --format @lint-todo/eslint-formatter-todo --ext .js,.ts,.tsx --cache", in .package.json with prettier combined in .eslintrc.cjs as 'plugin:prettier/recommended'

npm run build # Build the project
npm run firebase-deploy # or npx firebase deploy to deploy the site with the latest changes from git

# to enable sing-in go to Project => Authentication => Sign-in method => https://console.firebase.google.com/project/fit-35/authentication/providers
# => Sign-in providers => choose Google =>
```
