/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
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
        include: [path.resolve(__dirname, '../src/img/inlineSvg')],
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, '../src/img/spriteSvg')],
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
      template: path.resolve(__dirname, '../public/template.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      // filename: 'template.html',
      // cache: false,
    }),
  ],
  output: {
    clean: true,
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
    // publicPath: '/',  // makes it impossible to load index.html directly from build folder
  },
  stats: 'errors-only',
}
