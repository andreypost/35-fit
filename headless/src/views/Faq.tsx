// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { FooterBanner } from 'FooterBanner'

const Faq = () => {
  // const { t } = useTranslation(),
  // useEffect(() => {
  // }, [])

  return (
    <main data-aos="fade" className="page_view">
      <HeaderBanner
        className="faq"
        title="nav.faq"
        description="header_banner.training_becomes"
      />

      <img src={require('../img/patterns/pattern_bg_7_1.png')} alt="" />
      <FooterBanner
        title="faq.trial_foot_banner_title"
        price="99"
        subTitle="4 tests a year"
      />
    </main>
  )
}
export default Faq
