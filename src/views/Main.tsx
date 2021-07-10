import React, { useState, useEffect } from 'react'
import './Main.styles.scss'
// import redux from 'redux'
// import { createStore, combineReducers } from 'redux'
import Header from 'Header'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'utils/hooks'
import tie_fit from 'svg/tie_fit.svg'
import { unsetModal } from 'modals/modal.slice'


const Main: React.FC = () => {
  const { t } = useTranslation()
  const [opacity, setOpacity] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    setOpacity('active')
    const unsetModalState = (e: { key: string }) => {
      if (e.key === 'Escape') dispatch(unsetModal())
    }
    document.addEventListener('keydown', e => unsetModalState(e))
    return (
      dispatch(unsetModal()),
      document.removeEventListener('keydown', unsetModalState)
    )
  }, [dispatch])
  return (
    <div className={'fallback mainpage ' + opacity}>
      <Header>
        <h1>{t('nav.Personal training')}</h1>
        <div>
          <img src={tie_fit} alt="" className="tie" />
        </div>
      </Header>
      <main className="section">
        <h1>main</h1>
      </main>
    </div>
  )
}
export default Main
