import React, { useState, useEffect } from 'react'
import { userType } from 'types/commonPropTypes'
import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { CommunityArticle } from 'components/CommunityArticle'
import { InstaImages } from 'components/InstaImages'

import add_01 from '../img/adds/add_5_1.png'

const Coach = ({ user }) => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <img src={require('../img/patterns/pattern_bg_7_1.png')} alt="" />

      <img src={require('../img/patterns/pattern_bg_1_3.png')} alt="" />

      <CommunityArticle
        title="35fit_community"
        descript="header_banner.training_becomes"
        coach="Joyce's"
      />
      <InstaImages />
    </main>
  )
}
export default Coach
Coach.propTypes = {
  user: userType,
}
