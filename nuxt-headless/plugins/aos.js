/* import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

if (process.client) {
  AOS.init()

  Vue.directive('aos', {
    bind(el, binding) {
      const {
        animationType = 'fade',
        duration = 2000,
        once = false,
      } = binding.value || {}

      el.setAttribute('data-aos', animationType)
      el.setAttribute('data-aos-duration', duration)
      el.setAttribute('data-aos-once', once)
    },
    inserted(el) {
      if (process.client) {
        setTimeout(() => {
          if (el) {
            el.style.opacity = '1'
          }
        }, 2000)
      }
    },
  })
} */

// import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

/* Vue.use(
  AOS.init({
    duration: 2000,
    // once: true,
  })
) */

export default ({ app }) => {
  // if (process.client) {
  app.AOS = AOS.init({
    duration: 1000,
    // once: true,
  })
  // }
  app.i18n?.watchLocale?.((newLocale) => {
    if (process.client) {
      AOS.refresh()
    }
  })
}
