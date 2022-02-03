import { useState, useEffect } from 'react'
import { HeaderBanner } from 'HeaderBanner'
import { useTranslation } from 'react-i18next'
import { TieFitSVG } from 'components/icons'

const Main = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')
  // console.log('main')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback ' + opacity}>
      <main className="section">
        <HeaderBanner>
          <h1>{t('nav.Personal training')}</h1>
          <div>
            <TieFitSVG className="tie" />
          </div>
        </HeaderBanner>
        <h1>main</h1>
      </main>
    </div>
  )
}
export default Main
