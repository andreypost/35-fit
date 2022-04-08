import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { ImageDescription } from 'components/ImageDescription'

import add_01 from '../img/adds/add_5_1.png'

const Team = ({ user }) => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='team' title='nav.team' descript='header_banner.training_becomes' />
      <img src={require("../img/patterns/pattern_bg_7_1.png")} alt="" />

      <ImageDescription className='right_img' imgSrc={add_01} title='team.we_do_have_coaches' descript='header_banner.training_becomes' />
    </main>
  )
}
export default Team

