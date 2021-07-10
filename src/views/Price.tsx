import React, { useState, useEffect } from 'react'
import './Price.styles.scss'
// import i18n from "../i18n";
import Header from 'Header'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'utils/hooks'
import { unsetModal } from 'modals/modal.slice'

const Price: React.FC = () => {
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
    <div className={'fallback pricepage ' + opacity}>
      <Header>
        <h1>{t('nav.Pricing')}</h1>
        <h3></h3>
      </Header>
      <main className="section">
        <h1>price</h1>
      </main>
    </div>
  )
}

export default Price
