import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderBanner } from 'HeaderBanner'
import { CommunityArticle } from 'components/CommunityArticle'

const Training = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner
        className="train"
        title="nav.personal_training"
        descript="header_banner.35_minute_high"
      />

      <CommunityArticle
        className="alignCenter"
        title="training.built_for_everyone"
        descript="training.using_predefined_training"
      />

      <img src={require('../img/patterns/pattern_bg_1_3.png')} alt="" />
    </main>
  )
}
export default Training
