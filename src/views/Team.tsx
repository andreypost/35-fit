import { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { useTranslation } from 'react-i18next'

const Team = () => {
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
        <h1>Team</h1>
      </main>
    </div>
  )
}

export default Team
