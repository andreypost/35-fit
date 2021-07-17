import React, { useState, useEffect } from 'react'
import './Schedule.scss'
// import { Link } from 'react-router-dom'
import Header from 'Header'
import Footer from 'Footer'
import { useTranslation } from 'react-i18next'

const Schedule: React.FC = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback schedulepage ' + opacity}>
      <Header>
        <h1>{t('nav.Personal training')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>Schedule</h1>
      </main>
      <Footer />
    </div>
  )
}
export default Schedule
