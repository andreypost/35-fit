/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, '..', './src/img/inlineSvg')],
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, '..', './src/img/spriteSvg')],
        loader: 'svg-sprite-loader',
        // options: {
        //   extract: true,
        //   publicPath: "/",
        // },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-react-template',
      template: path.resolve(__dirname, '..', './src/index.html'),
      //   filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  stats: 'errors-only',
}
