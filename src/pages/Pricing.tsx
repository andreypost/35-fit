import React, { useEffect } from 'react'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import Header from '../components/Header'
import { useTranslation } from 'react-i18next'

const Pricing = (): any => {
  const { t } = useTranslation()

  return (
    <>
      <Header>
        <>
          <h1>{t('nav.Pricing')}</h1>
          <h3></h3>
        </>
      </Header>
      <main className="section">
        <h1>Pricing</h1>
      </main>
    </>
  )
}

export default Pricing
