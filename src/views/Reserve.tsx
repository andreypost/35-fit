import { useState, useEffect } from 'react'
// import './Training.scss'
// import { Link } from 'react-router-dom'
import { HeaderBanner } from 'HeaderBanner'
import { useTranslation } from 'react-i18next'

const Reserve = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback ' + opacity}>
      <HeaderBanner>
        <h1>{t('nav.Personal training')}</h1>
        <h3></h3>
      </HeaderBanner>
      <main className="section">
        <h1>Reserve Time</h1>
      </main>
    </div>
  )
}

export default Reserve
