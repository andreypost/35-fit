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
      <HeaderBanner className='schedule' title='nav.schedule' descript='header_banner.training_becomes' />
    </main>
  )
}
export default Schedule
