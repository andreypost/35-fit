/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const dotenv = require('dotenv')
const path = require('path')

// Load environment variables from .env.production file
dotenv.config({ path: './.env.production' })
// dotenv.config({ path: './../.env' }) // Docker .env file 

module.exports = ({ docker = false, netlify = false }) => {
  return {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            // 'style-loader', // style-loader is for development, MiniCssExtractPlugin is for production
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        // 'process.env.FIREBASE_API_KEY': JSON.stringify(
        //   process.env.FIREBASE_API_KEY
        // ),
        // 'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
        //   process.env.FIREBASE_MESSAGING_SENDER_ID
        // ),
        // 'process.env.FIREBASE_APP_ID': JSON.stringify(
        //   process.env.FIREBASE_APP_ID
        // ),
        // 'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env': JSON.stringify(process.env),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    ],
    output: {
      clean: true,
      path: path.resolve(
        __dirname,
        docker || netlify ? '../dist' : '../../build'
      ),
      filename: '[name].[contenthash].js',
      // publicPath: '/', // makes it !!! Impossible to load index.html directly from build folder
    },
    optimization: {
      splitChunks: {
        // chunks: 'async',
        chunks: 'all',
      },
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), '...'],
      // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
      // instead of having their own. This also helps with long-term caching, since the chunks will only
      // change when actual code changes, not the webpack runtime.
      // runtimeChunk: {
      //   // name: 'runtime', // Error: Conflict: Multiple chunks emit assets to the same filename bundle.js
      // },
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  }
}
