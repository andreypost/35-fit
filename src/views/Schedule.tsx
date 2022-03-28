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
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='schedule' title='nav.Personal training' descript=''>
        <div className="section">
          <h1>{t('nav.Personal training')}</h1>
          <h3></h3>
        </div>
        <h1>Schedule</h1>
      </HeaderBanner>
    </main>
  )
}
export default Schedule
