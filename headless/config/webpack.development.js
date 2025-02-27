/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const dotenv = require('dotenv')

// Load environment variables from .env.development file
dotenv.config({ path: './.env.development' })

module.exports = ({ docker }) => {
  return {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader', // Injects styles into DOM (only for dev)
            'css-loader', // Resolves CSS imports
            'postcss-loader', // Adds vendor prefixes (optional)
            'sass-loader', // Compiles SCSS to CSS
          ],
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
      liveReload: true,
      host: docker ? '0.0.0.0' : 'localhost', // for Docker, allows access from outside the container
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new webpack.HotModuleReplacementPlugin(), // HMR should never be used in production
      // new ReactRefreshWebpackPlugin(),
      // ],
    ].filter(Boolean),
  }
}
