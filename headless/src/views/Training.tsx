// import { useState, useEffect, useMemo } from 'react'
// import { useTranslation } from 'react-i18next'
import { HeaderBanner } from 'HeaderBanner'
import { CommunityArticle } from 'components/CommunityArticle'
import { FooterBanner } from 'FooterBanner'
import { TrainigOptions } from 'components/TrainigOptions'

const Training = () => {
  // const { t } = useTranslation(),
  //   [opacity, setOpacity] = useState('')

  // useEffect(() => {
  //   setOpacity('active')
  // }, [])

  return (
    <main data-aos="fade" className="page_view">
      <HeaderBanner
        className="train"
        title="nav.personal_training"
        description="header_banner.35_minute_high"
      />
      <TrainigOptions />
      <CommunityArticle
        className="alignCenter"
        title="training.built_for_everyone"
        description="training.using_predefined_training"
      />
      <img src={require('../img/patterns/pattern_bg_1_3.webp')} alt="" />
      <FooterBanner
        title="training.trial_foot_banner_title"
        price="17"
        subTitle="flexability + dynamics"
      />
    </main>
  )
}
export default Training
