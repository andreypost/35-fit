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
      <HeaderBanner className='train'>
        <div className="section">
          <h1>{t('nav.Personal training')}</h1>
          <h3></h3>
        </div>
          <h1>training</h1>
      </HeaderBanner>
    </main>
  )
}
export default Training
