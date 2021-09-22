import React, { useState, useEffect } from 'react'
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { useTranslation } from 'react-i18next'

const Pricing: React.FC = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback pricepage ' + opacity}>
      <main className="section">
        <HeaderBanner>
          <h1>{t('nav.Pricing')}</h1>
          <h3></h3>
        </HeaderBanner>
        <h1>price</h1>
      </main>
    </div>
  )
}

export default Pricing
