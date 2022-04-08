import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'

const Club = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='club' title='nav.club' descript='header_banner.training_becomes' />

      <img src={require("../img/patterns/pattern_bg_7_1.png")} alt="" /> 
      <img src={require("../img/patterns/pattern_bg_1_3.png")} alt="" />
    </main>
  )
}
export default Club
