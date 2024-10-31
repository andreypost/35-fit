import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context(
    '@/locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages = {}
  locales.keys().forEach((key) => {
    const locale = key.match(/([A-Za-z0-9-_]+)\./i)[1]
    messages[locale] = locales(key)
  })
  return messages
}

const getSavedLocale = () => {
  if (process.client) {
    console.log(localStorage.getItem('i18nextLng'))
    return localStorage.getItem('i18nextLng') || 'en'
  }
  return 'en'
}

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: getSavedLocale(),
    fallbackLocale: 'en',
    messages: loadLocaleMessages(),
  })
}
