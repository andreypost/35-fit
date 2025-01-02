/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
  const { env, netlify } = envVars
  // netlify flags can be passed from package.json file with script command:
  // "netlify": "npx webpack --config config/webpack.config.js --env env=prod netlify=true",
  const envConfig = require(`./webpack.${env}.js`)
  return merge(commonConfig({ netlify }), envConfig)
}
