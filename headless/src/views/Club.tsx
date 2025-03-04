// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { CommunityArticle } from 'components/CommunityArticle'
import { InstaImages } from 'components/InstaImages'
import { FooterBanner } from 'FooterBanner'

const Club = () => {
  // const { t } = useTranslation(),
  // useEffect(() => {
  // }, [])

  return (
    <main data-aos="fade" className="page_view">
      <HeaderBanner
        className="club"
        title="nav.club"
        description="header_banner.training_becomes"
      />
      <img src={require('../img/patterns/pattern_bg_7_1.webp')} alt="" />
      <img src={require('../img/patterns/pattern_bg_1_3.webp')} alt="" />
      <CommunityArticle
        title="common.35fit_community"
        subTitle={true}
        description="header_banner.training_becomes"
      />
      <InstaImages />
      <FooterBanner
        title="club.trial_foot_banner_title"
        price="4.95"
        subTitle="month"
      />
    </main>
  )
}
export default Club
