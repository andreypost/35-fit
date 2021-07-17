import React, { useState, useEffect } from 'react'
import './Price.scss'
// import i18n from "../i18n";
import Header from 'Header'
import Footer from 'Footer'
import { useTranslation } from 'react-i18next'

const Price: React.FC = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback pricepage ' + opacity}>
      <Header>
        <h1>{t('nav.Pricing')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>price</h1>
      </main>
      <Footer />
    </div>
  )
}

export default Price
