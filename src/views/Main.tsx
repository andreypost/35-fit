import React, { useState, useEffect } from 'react'
import './Main.scss'
import Header from 'Header'
import Footer from 'Footer'
import { useTranslation } from 'react-i18next'
import tie_fit from 'svg/tie_fit.svg'

const Main: React.FC = () => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')
  console.log('main')

  useEffect(() => {
    setOpacity('active')
  }, [])
  return (
    <div className={'fallback mainpage ' + opacity}>
      <Header>
        <h1>{t('nav.Personal training')}</h1>
        <div>
          <img src={tie_fit} alt="tie-fit" className="tie" />
        </div>
      </Header>
      <main className="section">
        <h1>main</h1>
      </main>
      <Footer />
    </div>
  )
}
export default Main
