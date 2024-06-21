// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import i18n from "../i18n";
import styled from 'styled-components'
import { HeaderBanner } from 'HeaderBanner'
import { FooterBanner } from 'FooterBanner'
import { PlanPricesBox } from 'components/ui/PlanPricesBox'

const Main = styled.main`
  .pricing_banner {
    padding-top: 40px;
    padding-bottom: 40px;
    background: url(${require('../img/patterns/pattern_bg_footer_banner.png')})
      center 30% / contain no-repeat;
    .section {
      margin-bottom: 20px;
      &.flex_box {
        gap: 20px;
        .plan_prices_box {
          max-width: 413px;
          min-width: 280px;
          flex: 1;
        }
      }
    }
  }
  @media (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`

const Pricing = () => {
  // const { t } = useTranslation(),
  //   [opacity, setOpacity] = useState('')

  // useEffect(() => {
  //   setOpacity('active')
  // }, [])

  return (
    <Main data-aos="fade" className="page_view">
      <HeaderBanner
        className="price"
        title="nav.pricing"
        description="header_banner.training_becomes"
      />

      <div className="pricing_banner">
        <section className="section">
          <PlanPricesBox
            className="banner"
            title="main.trial_foot_banner_title"
            subTitle="3 classes / 10 days"
            description="pricinig.milons_broad_range"
            price="17€"
            button="main.register_trial"
          />
        </section>
        <section className="section flex_box flex_center_around wrap">
          <PlanPricesBox
            className="box"
            title="SMART"
            subTitle="9-10 classes/month"
            description="18 month agreement"
            price="35€"
            sales={32}
            button="pricinig.details"
          />
          <PlanPricesBox
            className="box"
            title="OPTIMAL"
            subTitle="9-10 classes/month"
            description="12 month agreement"
            price="44€"
            sales={57}
            button="pricinig.details"
          />
          <PlanPricesBox
            className="box"
            title="FLEX"
            subTitle="9-10 classes/month"
            description="No agreement"
            price="52€"
            sales={18}
            button="pricinig.details"
          />
        </section>
        <section className="section flex_box flex_center_around wrap">
          <PlanPricesBox
            className="box"
            title="SUPER FLEX"
            subTitle="15 classes / month"
            price="62€"
            button="main.register_trial"
          />
          <PlanPricesBox
            className="text"
            description="pricinig.milons_broad_range"
          />
        </section>
      </div>

      <img src={require('../img/patterns/pattern_bg_7_1.png')} alt="" />
      <FooterBanner
        title="pricinig.trial_foot_banner_title"
        price="99"
        subTitle="4 tests a year"
      />
    </Main>
  )
}
export default Pricing
