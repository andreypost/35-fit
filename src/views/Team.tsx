import React, { useState, useEffect } from 'react'
import './Team.scss'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import Header from 'Header'
import Footer from 'Footer'
import { useTranslation } from 'react-i18next'

const Team: React.FC = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback teampage ' + opacity}>
      <Header>
        <h1>{t('nav.Pricing')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>Team</h1>
      </main>
      <Footer />
    </div>
  )
}

export default Team
