// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
import { HeaderBanner } from 'HeaderBanner'
import { ImageDescription } from 'components/ImageDescription'
import { CommunityArticle } from 'components/CommunityArticle'

import add_01 from '../img/adds/add_4_1.jpg'
import add_02 from '../img/adds/add_4_2.jpg'
import { InstaImages } from 'components/InstaImages'
import { FooterBanner } from 'FooterBanner'

const Schedule = () => {
  // const { t } = useTranslation(),

  return (
    <main data-aos="fade" className="page_view">
      <HeaderBanner
        className="schedule"
        title="nav.schedule"
        description="header_banner.training_becomes"
      />

      <img src={require('../img/patterns/pattern_bg_7_1.webp')} alt="" />
      <ImageDescription
        imgSrc={add_01}
        title="schedule.for_better_results"
        description="header_banner.training_becomes"
      />
      <ImageDescription
        className="right_img"
        imgSrc={add_02}
        title="schedule.for_better_results"
        description="header_banner.training_becomes"
      />
      <img src={require('../img/patterns/pattern_bg_1_3.webp')} alt="" />
      <CommunityArticle
        title="35fit_community"
        subTitle={true}
        description="header_banner.training_becomes"
      />
      <InstaImages />
      <FooterBanner
        title="schedule.trial_foot_banner_title"
        price="4.95"
        subTitle="month"
      />
    </main>
  )
}
export default Schedule
