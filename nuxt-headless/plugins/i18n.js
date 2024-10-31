import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context(
    '@/locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  if (process.client) {
    console.log(window)
  }
  const messages = {}
  locales.keys().forEach((key) => {
    const locale = key.match(/([A-Za-z0-9-_]+)\./i)[1]
    messages[locale] = locales(key)
  })
  return messages
}

export default ({ app }) => {
  app.i18n = new VueI18n({
    // locale: 'en',
    fallbackLocale: 'en',
    messages: loadLocaleMessages(),
  })
}
