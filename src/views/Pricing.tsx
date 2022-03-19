import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'

const Pricing = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <div className={'fallback ' + opacity}>
      <main className="section">
        <HeaderBanner>
          <h1>{t('nav.Pricing')}</h1>
          <h3></h3>
        </HeaderBanner>
        <h1>price</h1>
      </main>
    </div>
  )
}
export default Pricing