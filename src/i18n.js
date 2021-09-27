import i18n from 'i18next'
// import Backend from 'i18next-http-backend' // if detected country language is not presented on project - you should/must turn off this option
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationDE from '../public/locales/de/translations.json'
import translationEE from '../public/locales/ee/translations.json'
import translationEN from '../public/locales/en/translations.json'

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend) // if detected country language is not presented on project - you should/must turn off this option
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    resources: {
      de: {
        translation: translationDE,
      },
      ee: {
        translation: translationEE,
      },
      en: {
        translation: translationEN,
      },
    },
    debug: true,
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },
  })

export default i18n
