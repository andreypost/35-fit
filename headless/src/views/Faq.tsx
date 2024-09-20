// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import styled from 'styled-components'
import { HeaderBanner } from 'HeaderBanner'
import { FooterBanner } from 'FooterBanner'

const Main = styled.main`
  .faq {
  }
  @media (max-width: 768px) {
  }
  @media (min-width: 769px) {
  }
  @media (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`

const Faq = () => {
  // const { t } = useTranslation(),
  // useEffect(() => {
  // }, [])

  return (
    <Main data-aos="fade" className="page_view">
      <HeaderBanner
        className="faq"
        title="nav.faq"
        description="header_banner.training_becomes"
      />
      <section className="section faq"></section>
      <img src={require('../img/patterns/pattern_bg_7_1.png')} alt="" />
      <FooterBanner
        title="faq.trial_foot_banner_title"
        price="99"
        subTitle="4 tests a year"
      />
    </Main>
  )
}
export default Faq
