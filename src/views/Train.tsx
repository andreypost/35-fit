import React, { useState, useEffect } from 'react'
import './Train.scss'
import { Header } from 'Header'
import { Footer } from 'Footer'
import { useTranslation } from 'react-i18next'

const Train: React.FC = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback trainpage ' + opacity}>
      <Header>
        <h1>{t('nav.Personal training')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>training</h1>
      </main>
      <Footer />
    </div>
  )
}

export default Train
