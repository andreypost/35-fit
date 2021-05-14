import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useTranslation } from 'react-i18next'

const Training = (): any => {
  const { t } = useTranslation()
  return (
    <>
      <Header>
        <>
          <h1>{t('nav.Personal_training')}</h1>
          <h3></h3>
        </>
      </Header>
      <main className="section"></main>
    </>
  )
}

export default Training
