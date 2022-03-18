import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'

const Faq = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <div className={'fallback ' + opacity}>
      <HeaderBanner>
        <h1>{t('nav.Pricing')}</h1>
        <h3></h3>
      </HeaderBanner>
      <main className="section">
        <h1>Faq</h1>
      </main>
    </div>
  )
}
export default Faq
