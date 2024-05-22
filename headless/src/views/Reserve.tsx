// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import './Training.scss'
// import { Link } from 'react-router-dom'
import { HeaderBanner } from 'HeaderBanner'

const Reserve = () => {
  // const { t } = useTranslation(),
  //   [opacity, setOpacity] = useState('')

  // useEffect(() => {
  //   setOpacity('active')
  // }, [])

  return (
    <main data-aos="fade">
      <HeaderBanner className="reserve" title="nav.reservation" />
    </main>
  )
}
export default Reserve
