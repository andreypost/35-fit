/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      Spinner$: path.resolve(__dirname, '../src/components/Spinner.tsx'), // $ - added to signify an exact match
      components: path.resolve(__dirname, '../src/components'),
      modals: path.resolve(__dirname, '../src/modals'),
      HeaderBanner$: path.resolve(
        __dirname,
        '../src/components/HeaderBanner.tsx',
      ),
      // Footer$: path.resolve(__dirname, '../src/components/Footer.tsx'),
      // Nav$: path.resolve(__dirname, '../src/components/Nav.tsx'),
      img: path.resolve(__dirname, '../src/img'),
      svg: path.resolve(__dirname, '../src/img/svg'),
      mixins$: path.resolve(__dirname, '../src/styles/variables-mixins.scss'),
      utils: path.resolve(__dirname, '../src/utils'),
      views: path.resolve(__dirname, '../src/views'),
      store$: path.resolve(__dirname, '../src/store/root.store.ts'),
      reducer$: path.resolve(__dirname, '../src/store/root.reducer.ts'),
      // '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(?:svg|ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // { // @font-face type of connetion fonts is much more slower.
      //   test: /\.(woff(2)?|eot|ttf|otf)$/,
      //   type: 'asset/inline',
      // },
      // { // rules for svg to load as inline, and as sprites in index.html and use them in components -> <svg><use xlinkHref={arrow}></use></svg>
      //   test: /\.svg$/,
      //   include: [path.resolve(__dirname, '../src/img/inlineSvg')],
      //   type: 'asset/inline',
      // },
      // {
      //   test: /\.svg$/,
      //   include: [path.resolve(__dirname, '../src/img/spriteSvg')],
      //   loader: 'svg-sprite-loader',
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '35 fit',
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
