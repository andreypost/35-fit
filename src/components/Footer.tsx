import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
import Login from 'modals/Login'
import Menu from 'modals/Menu'
import Message from 'modals/Message'
import Dashboard from 'modals/Dashboard'
import { useAppDispatch } from 'utils/hooks'
import { unsetModal } from 'modals/modal.slice'
import { unsetMessageModal } from 'modals/message.modal.slice'

const Footer: React.FC = () => {
  // const { t } = useTranslation()
  const [opacity, setOpacity] = useState(''),
    dispatch = useAppDispatch()

  useEffect(() => {
    setOpacity('active')
    const unsetModalState = (e: { key: string }) => {
      if (e.key === 'Escape') dispatch(unsetModal()), dispatch(unsetMessageModal())
    }
    document.addEventListener('keydown', e => unsetModalState(e))
    return (
      dispatch(unsetModal()),
      document.removeEventListener('keydown', unsetModalState)
    )
  }, [dispatch])
  return (
    <footer>
      <div className="section">
        <ul>
          <li>{/* <Link to="/Faq">{t('footer.Careers')}</Link> */}</li>
          <li>{/* <Link to="/">{t('footer.Privacy')}</Link> */}</li>
          <li>{/* <Link to="/">{t('footer.Terms')}</Link> */}</li>
        </ul>
      </div>
      <Dashboard />
      <Login />
      <Menu />
      <Message />
    </footer>
  )
}

export default Footer
