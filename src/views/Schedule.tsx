import React, { useState, useEffect } from 'react'
import './Schedule.styles.scss'
// import { Link } from 'react-router-dom'
import Header from 'Header'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'utils/hooks'
import { unsetModal } from 'modals/modal.slice'

const Schedule: React.FC = () => {
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
    <div className={'fallback schedulepage ' + opacity}>
      <Header>
        <h1>{t('nav.Personal training')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>Schedule</h1>
      </main>
    </div>
  )
}

export default Schedule
