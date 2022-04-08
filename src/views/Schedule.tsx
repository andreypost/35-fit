import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
import { HeaderBanner } from 'HeaderBanner'
import { ImageDescription } from 'components/ImageDescription'

import add_01 from '../img/adds/add_4_1.png'
import add_02 from '../img/adds/add_4_2.png'

const Schedule = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='schedule' title='nav.schedule' descript='header_banner.training_becomes' />

      <img src={require("../img/patterns/pattern_bg_7_1.png")} alt="" />
      <ImageDescription imgSrc={add_01} title='schedule.for_better_results' descript='header_banner.training_becomes' />
      <ImageDescription className='right_img' imgSrc={add_02} title='schedule.for_better_results' descript='header_banner.training_becomes' />
      <img src={require("../img/patterns/pattern_bg_1_3.png")} alt="" />
    </main>
  )
}
export default Schedule
