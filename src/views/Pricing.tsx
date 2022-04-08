import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'

const Pricing = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='price' title='nav.pricing' descript='header_banner.training_becomes' />

      <img src={require("../img/patterns/pattern_bg_7_1.png")} alt="" />
    </main>
  )
}
export default Pricing
