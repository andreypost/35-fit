# 35-fit

This repository contains instructions and scripts for setting up and deploying the 35-fit project.

## Installation

Ensure you have Node Version Manager (nvm) installed on your system. Then, run the following commands:

````bash
nvm list # Check available Node.js versions
nvm current # Check current Node.js version
nvm use 16.--.- # Use Node.js version 16.--.-

# settings to automatically switch Node.js versions using nvm when changing directories:
# check shell
echo $SHELL
# MAC using 'zsh':
nano ~/.zshrc
# add the following script to the end of .zshrc file:

autoload -U add-zsh-hook
load-nvmrc() {
  if [[ -f .nvmrc && -r .nvmrc ]]; then
    nvm use
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc

# save & exit
# reload .zshrc:
source ~/.zshrc

# UBUNTU using 'bash':
nano ~/.bashrc
# add the following script to the end of .bashrc file:

load-nvmrc() {
  if [[ -f .nvmrc ]]; then
    nvm use
  fi
}
cd() {
  builtin cd "$@" && load-nvmrc
}
load-nvmrc

# save & exit
# reload .bashrc:
source ~/.bashrc


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


# to grant all roles with ubuntu user (andrii) and pass
sudo -u postgres psql
ALTER ROLE andrii WITH SUPERUSER CREATEDB CREATEROLE REPLICATION BYPASSRLS;
CREATE ROLE andrii WITH LOGIN SUPERUSER PASSWORD '1111';


# Ubuntu, connect to postgres, fitdb databases:
psql -U andrii -d postgres -W
psql -U andrii -d fitdb -W

# Mac & Ubuntu connections to databases with andrii user:
psql postgres
psql fitdb

ALTER USER user_name WITH PASSWORD 'new_secure_password';

\l # list database
CREATE DATABASE fitdb;
\c fitdb # connect to database
\du # list all users
\dt # list all tables
\d "user" # see table schema
\d+ "user" # see table schema

\l+ # check existing privileges on the database
\q # quit terminal

REVOKE ALL PRIVILEGES ON DATABASE postgres FROM andrii;
REVOKE ALL PRIVILEGES ON DATABASE fitdb FROM andrii;
REASSIGN OWNED BY andrii TO postgres;
DROP OWNED BY andrii;
\dO andrii # review objects owned by the user
DROP OWNED BY andrii;
DROP ROLE andrii;

CREATE ROLE andrii WITH LOGIN PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE fitdb TO andrii;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO andrii;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO andrii;
GRANT USAGE ON SCHEMA public TO andrii;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO andrii;

\dp # verify the privileges

SELECT * FROM "user";
DELETE FROM "user";
INSERT INTO user (columns...) VALUES (values...);
UPDATE User SET column=value WHERE condition;
DELETE FROM "user" WHERE email or name or id = 'test_05@email.com';
DELETE FROM "user" WHERE email = 'test_05@email.com';

DROP TABLE "user";

# railway Database Connection
PGPASSWORD=railway_password psql -h monorail.proxy.rlwy.net -U postgres -p 33230 -d railway

### cd headless
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

# steps to deploy 35-fit monorepo on railway
# https://kapsys.io/user-experience/ultimate-guide-to-deploying-monorepo-project-on-railway-app
# Railway:
    # - create a project as Empty project
    # - Add Mew Service as Empty Service
    # - Service Settings:
        # - Rename Service: api
        # - Connect Source: Connect Repo:
        # - Root Directory: /api
        # - Custom Build Command: echo "No build step"
        # - Watch Paths: /api
# Service can be deployed
# After this steps, in case of successful deploy in details you will be prompted to add railway.json file

# Nest.js api
    # - npm i -g @nestjs/cli    install nest cli global
    # - nest new nest-api       create a new project nest-api

## Setup Instructions
After pulling the repository, make the build script executable:

```sh
chmod +x build.sh


### Docker
## 🔥 removed stopped containers
docker container prune

## 🔥 remove unused images
docker image prune -a

## 🔥 remove unused volumes
docker volume prune

## 🔥 remove unused networks
docker network prune

## 🔥 remove docker build cache
docker builder prune -a

## get detailed image info
docker inspect <image_id || repository>

## view logs of a container
docker logs -f <container_name || container_id>

## start a running container
docker start <container_name || container_id>

## stop a running container
docker stop <container_name || container_id>

## first run migraition
docker exec -it fit-nest-api npm run typeorm:run

## start services in docker-compose.yaml
docker compose up -d

## restart services
docker compose restart

## stop all running containers
docker compose down

## check runing container
docker ps

## view all containers, including stopped
docker ps -a

## list docker images
docker images

## check existing volumes
docker volume ls

## check docker-compose.yaml config
docker compose config

docker exec -it fit-headless npm run docker
docker exec -it fit-headless ls -la /app/dist

## Stop and Remove the Existing Containers
docker compose down --remove-orphans

## Stops and removes all containers, networks, and volumes
docker compose down -v

## 🔥 Remove Old Docker Images, Containers, and Volumes
docker system prune -a --volumes -f
# -a → Removes all unused images, including ones not referenced by any containers.
# --volumes → Removes all unused volumes.
# -f → Forces cleanup without asking for confirmation.

## Rebuild, Build Containers
docker compose up --build -d
# -d → runs the containers in the background (detached mode)

## Fix Ownership
sudo chown -R andrii:andrii /home/andrii/projects/35-fit/nest-api/dist

## Dump
# Dump from local PostgreSQL database
pg_dump -U andrii -d fitdb -F c -f fitdb.dump

## Dump from docker
docker exec -it fitdb pg_dump -U andrii -d fitdb -F c -f /fitdb.dump

## Then copy the dump file from the Docker container to your host machine
docker cp fitdb:/fitdb.dump .

## Restore .dump file to Local PostgreSQL
pg_restore -U andrii -d fitdb fitdb.dump

## Restore .dump file to Docker PostgreSQL
# First, copy the dump file into the container:
docker cp fitdb.dump fitdb:/fitdb.dump
## Then restore inside Docker:
docker exec -it fitdb pg_restore -U andrii -d fitdb /fitdb.dump



## Check the PostgreSQL version inside your Docker container
docker exec -it fitdb psql -U andrii -d fitdb -c "SELECT version();"

## Check the PostgreSQL version on your host system
psql -U andrii -d fitdb -c "SELECT version();"

SELECT COUNT(*) FROM "user";
DROP INDEX IF EXISTS idx_order;
DROP INDEX idx_order;
CREATE INDEX idx_order ON public."order" (user_id);
EXPLAIN ANALYZE SELECT * FROM "order" WHERE user_id = 'd420365e-0d86-4130-9633-3a9725a5e131';

CREATE INDEX CONCURRENTLY IDX_order_items_order_id ON order_items(order_id);
SELECT * FROM pg_stat_user_indexes WHERE relname = 'order_items';

````
