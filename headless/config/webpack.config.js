/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
  const { env, docker, netlify } = envVars
  console.log('env: ', env)
  console.log('docker: ', docker)
  // netlify, docker flags can be passed from package.json file with script command:
  // "netlify": "npx webpack --config config/webpack.config.js --env env=prod netlify=true",
  let envConfig = require(`./webpack.${env}.js`)

  // if (typeof envConfig === 'function') {
  envConfig = envConfig({ docker, netlify })
  // }
  return merge(commonConfig({ docker, netlify }), envConfig)
}
