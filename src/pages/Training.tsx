import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useTranslation } from 'react-i18next'

const Training: React.FC = (): any => {
  const { t } = useTranslation()
  return (
    <>
      <Header>
        <h1>{t('nav.Personal training')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>training</h1>
      </main>
    </>
  )
}

export default Training
