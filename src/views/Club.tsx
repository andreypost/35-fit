import React, { useState, useEffect } from 'react'
import './Club.scss'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import Header from 'Header'
import Footer from 'Footer'
import { useTranslation } from 'react-i18next'


const Club: React.FC = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')
  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback clubpage ' + opacity}>
      <Header>
        <h1>{t('nav.Pricing')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>Club</h1>
      </main>
      <Footer />
    </div>
  )
}

export default Club
