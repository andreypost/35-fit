import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
import { HeaderBanner } from 'HeaderBanner'

const Schedule = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback ' + opacity}>
      <main className="section">
        <HeaderBanner>
          <h1>{t('nav.Personal training')}</h1>
          <h3></h3>
        </HeaderBanner>
        <h1>Schedule</h1>
      </main>
    </div>
  )
}
export default Schedule
