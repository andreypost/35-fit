import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderBanner } from 'HeaderBanner'

const Training = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='train' title='nav.personal_training' descript='header_banner.35_minute_high' />
    </main>
  )
}
export default Training
