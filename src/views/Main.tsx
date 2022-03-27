import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderBanner } from 'HeaderBanner'
import { TieFitSVG } from 'img/icons'

const Main = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')
  // console.log('main')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='main' >
        <section className="section">
          <h1>{t('nav.Personal training')}</h1>
          <div>
            <TieFitSVG className="tie" />
          </div>
        </section>
      </HeaderBanner>
      <h1>main</h1>
    </main>
  )
}
export default Main
