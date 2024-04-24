# 35-fit

nvm list
nvm current
nvm use 16.--.-
npm start

# or this commands if the project is not installed yet
npm i
# or this command, if package-lock.json exists, it will not change package-lock.json
npm ci

npm install --frozen-lockfile
yarn install --frozen-lockfile

npm run firebase-login
# or
npx firebase login

npm run firebase-init
# or
npx firebase init
# Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys

# Please select an option: Use an existing project

# Select a default Firebase project for this directory: fit-35 (35-fit)

# What do you want to use as your public directory? build

# Configure as a single-page app (rewrite all urls to /index.html)? Yes

# Set up automatic builds and deploys with GitHub? No

# File build/index.html already exists. Overwrite? No

# Firebase initialization complete!

npm run build

# --> then push the changes to take effect on live site


# this command will deploy the site with the latest changes from git
npm run firebase-deploy
# or
npx firebase deploy

# to enable sing-in go to Project => Authentication => Sign-in method => https://console.firebase.google.com/project/fit-35/authentication/providers
# => Sign-in providers => choose Google => 

npm run lint
# this command runs script field "lint": "eslint src --format @lint-todo/eslint-formatter-todo --ext .js,.ts,.tsx --cache", in .package.json with prettier combined in .eslintrc.cjs as 'plugin:prettier/recommended',