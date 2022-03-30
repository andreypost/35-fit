import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderBanner } from 'HeaderBanner'
import { TieFitSVG } from 'img/icons'

const Main = ({ user }) => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')
  // console.log('main')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <main className={'fallback ' + opacity}>
      <HeaderBanner className='main' title='nav.personal_training'>
        <TieFitSVG />
      </HeaderBanner>
    </main>
  )
}
export default Main
