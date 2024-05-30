# 35-fit

This repository contains instructions and scripts for setting up and deploying the 35-fit project.

## Installation

Ensure you have Node Version Manager (nvm) installed on your system. Then, run the following commands:

```bash
nvm list # Check available Node.js versions
nvm current # Check current Node.js version
nvm use 16.--.- # Use Node.js version 16.--.-

npm i # Install dependencies, first installation
npm ci # remove node_modules, fresh install based strictly on the package-lock.json

npm install --frozen-lockfile
yarn install --frozen-lockfile # will not remove node_modules, will not modified the package-lock.json

# cd functions, it works locally, but fit-35 must be on Blaze (pay-as-you-go) plan
npm install --frozen-lockfile
npm run firebase-login # or npx firebase login
npm run firebase-init # or npx firebase init, can to run to reinit the project
# Follow the prompts:
# - Functions: Configure a Cloud Functions directory and its files
# ? What language would you like to use to write Cloud Functions? TypeScript
# ? Do you want to use ESLint to catch probable bugs and enforce style? Yes
# ? Do you want to install dependencies with npm now? Yes
npm run serve


# postgresql, root dir
sudo nano /etc/postgresql/16/main/pg_hba.conf # ubuntu to edit config file
sudo nano /usr/local/var/postgresql@15/pg_hba.conf # mac to edit config file
sudo systemctl restart postgresql # restart after changes
sudo systemctl status postgresql # check the status of PostgreSQL


# Ubuntu, connect to PostgreSQL postgres, fitdb databases, use password
sudo -u postgres psql # with ubuntu user (andrii) and pass
psql -U andriidb -d postgres -W
psql -U andriidb -d fitdb -W

# psql fitdb
# psql postgres

ALTER USER postgres WITH PASSWORD 'new_secure_password';

\l # list database
CREATE DATABASE fitdb;
\c fitdb # connect to database
\du # list all users
\dt # list all tables

\l+ # check existing privileges on the database
\q # quit terminal

REVOKE ALL PRIVILEGES ON DATABASE postgres FROM andrii;
REVOKE ALL PRIVILEGES ON DATABASE fitdb FROM andrii;
REASSIGN OWNED BY andrii TO postgres;
DROP OWNED BY andrii;
\dO andrii # review objects owned by the user
DROP OWNED BY andrii;
DROP ROLE andrii;


CREATE ROLE andriidb WITH LOGIN PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE fitdb TO andriidb;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO andriidb;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO andriidb;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO andriidb;
\dp # verify the privileges



# database
\d "Users";

SELECT * FROM "Users";
DELETE FROM "Users";
INSERT INTO Users (columns...) VALUES (values...);
UPDATE Users SET column=value WHERE condition;
DELETE FROM "Users" WHERE email or name or id = 'postoliuk.av@gmail.com';


# cd api
node server # start express

# railway Database Connection
PGPASSWORD=railway_password psql -h monorail.proxy.rlwy.net -U postgres -p 33230 -d railway

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
