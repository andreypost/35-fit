export default {
  // target: 'static',
  // ssr: false,
  head: {
    title: '35-fit',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/styles/normalize.css', '~/assets/styles/common.scss'],
  styleResources: {
    scss: ['~/assets/styles/_mixins.scss'],
  },
  plugins: [
    {
      src: '~/plugins/aos.js',
      mode: 'client',
    },
  ],
  components: true,
  buildModules: ['@nuxtjs/style-resources', '@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios'],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  env: {
    apiUrl: process.env.API_URL,
  },
  build: {
    extend(config) {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            // Use vue-svg-loader for SVGs with the `?inline` query, so they can be imported as Vue components
            resourceQuery: /inline/,
            use: ['babel-loader', 'vue-svg-loader'],
          },
          {
            //   // Use file-loader for SVGs without `?inline`, for example, background images in CSS
            use: ['file-loader'],
          },
          // {
          //   use: [
          //     {
          //       loader: 'file-loader',
          //       options: {
          //         name: 'assets/[name].[hash:8].[ext]',
          //       },
          //     },
          //   ],
          // },
        ],
      })
    },

    // extend: (config) => {
    //   const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

    //   svgRule.test = /\.(png|jpe?g|gif|webp)$/

    //   config.module.rules.push({
    //     test: /\.svg$/,
    //     use: ['babel-loader', 'vue-svg-loader'],
    //   })
    // },
  },
}
