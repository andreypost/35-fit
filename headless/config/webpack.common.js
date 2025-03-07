/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      config: path.resolve(__dirname, '../src/config.ts'),
      components: path.resolve(__dirname, '../src/components'),
      constants: path.resolve(__dirname, '../src/constants'),
      HeaderBanner$: path.resolve(
        __dirname,
        '../src/components/HeaderBanner.tsx'
      ),
      Spinner$: path.resolve(__dirname, '../src/components/Spinner.tsx'),
      FooterBanner$: path.resolve(
        __dirname,
        '../src/components/FooterBanner.tsx'
      ),
      // Footer$: path.resolve(__dirname, '../src/components/Footer.tsx'),
      // Nav$: path.resolve(__dirname, '../src/components/Nav.tsx'),
      queries: path.resolve(__dirname, '../src/graphql/queries'),
      modals: path.resolve(__dirname, '../src/modals'),
      img: path.resolve(__dirname, '../src/img'),
      svg: path.resolve(__dirname, '../src/img/svg'),
      mixins$: path.resolve(__dirname, '../src/styles/variables.scss'),
      slices: path.resolve(__dirname, '../src/slices'),
      utils: path.resolve(__dirname, '../src/utils'),
      views: path.resolve(__dirname, '../src/views'),
      store$: path.resolve(__dirname, '../src/store/root.store.ts'),
      reducer$: path.resolve(__dirname, '../src/store/root.reducer.ts'),
      types: path.resolve(__dirname, '../src/types'),
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
        test: /\.(?:svg|ico|gif|png|jpg|jpeg|webp)$/i,
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
  stats: 'miminal', // 'errors-only'
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
