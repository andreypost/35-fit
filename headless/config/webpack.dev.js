/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true, // make possible to refresh a page other than the root URL (SPA), for production use => HashRouter
    // contentBase: path.resolve(__dirname, './build'),
    // compress: true,
    // contentBase: '../build',
    port: 8080,
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR should never be used in production
    // new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
}
