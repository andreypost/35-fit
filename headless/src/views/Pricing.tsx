// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { FooterBanner } from 'FooterBanner'

const Pricing = () => {
  // const { t } = useTranslation(),
  //   [opacity, setOpacity] = useState('')

  // useEffect(() => {
  //   setOpacity('active')
  // }, [])

  return (
    <main data-aos="fade" className="page_view">
      <HeaderBanner
        className="price"
        title="nav.pricing"
        description="header_banner.training_becomes"
      />

      <img src={require('../img/patterns/pattern_bg_7_1.png')} alt="" />
      <FooterBanner
        className="price"
        title="nav.pricing"
        description="header_banner.training_becomes"
      />
    </main>
  )
}
export default Pricing
