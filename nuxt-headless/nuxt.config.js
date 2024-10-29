export default {
  target: 'static',
  ssr: false,
  head: {
    title: 'nuxt-headless',
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
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/style-resources', '@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios'],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  build: {},
}
