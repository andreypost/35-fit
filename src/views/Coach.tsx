import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { CommunityArticle } from 'components/CommunityArticle'

import add_01 from '../img/adds/add_5_1.png'

const Coach = ({ user }) => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>

      <img src={require("../img/patterns/pattern_bg_7_1.png")} alt="" />

      <img src={require("../img/patterns/pattern_bg_1_3.png")} alt="" />

      <CommunityArticle title='35fit_community' descript='header_banner.training_becomes' coach="Joyce's" />
      
    </main>
  )
}
export default Coach

