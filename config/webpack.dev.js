/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
// const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true, // make possible to refresh a page other than the root URL (SPA), for production use => HashRouter
    // contentBase: path.resolve(__dirname, './build'),
    // compress: true,
    // contentBase: '../build',
    port: 8080,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('development_mode'),
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR should never be used in production
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
}
