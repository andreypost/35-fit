/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
  const { env = 'development', docker = false, netlify = false } = envVars
  // netlify, docker flags is passed from package.json file with script command
  let envConfig = require(`./webpack.${env}.js`)

  const envOptions =
    env === 'development' ? { docker } : env === 'production' ? { netlify } : {}

  // if (typeof envConfig === 'function') {
  envConfig = envConfig(envOptions)
  // }
  return merge(commonConfig, envConfig)
}
