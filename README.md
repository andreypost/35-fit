# 35-fit

This repository contains instructions and scripts for setting up and deploying the 35-fit project.

## Installation

Ensure you have Node Version Manager (nvm) installed on your system. Then, run the following commands:

```bash
nvm list # Check available Node.js versions
nvm current # Check current Node.js version
nvm use 16.--.- # Use Node.js version 16.--.-
npm start # Start the project

npm i # Install dependencies
npm ci # Install dependencies without changing package-lock.json (if exists)

npm install --frozen-lockfile
yarn install --frozen-lockfile

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

npm run lint
# this command runs script field "lint": "eslint src --format @lint-todo/eslint-formatter-todo --ext .js,.ts,.tsx --cache", in .package.json with prettier combined in .eslintrc.cjs as 'plugin:prettier/recommended'

npm run build # Build the project
npm run firebase-deploy # or npx firebase deploy to deploy the site with the latest changes from git

# to enable sing-in go to Project => Authentication => Sign-in method => https://console.firebase.google.com/project/fit-35/authentication/providers
# => Sign-in providers => choose Google =>
```
