import AOS from 'aos'
import 'aos/dist/aos.css'

export default ({ app }) => {
  app.AOS = AOS.init({
    duration: 2000,
  })
}
