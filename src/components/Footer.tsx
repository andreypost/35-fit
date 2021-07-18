import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
import MenuModal from 'modals/MenuModal'
import LoginModal from 'modals/LoginModal'
import MessageModal from 'modals/MessageModal'
import DashboardModal from 'modals/DashboardModal'
import { useAppDispatch } from 'utils/hooks'
import { unsetModal, unsetMessageModal } from 'modals/modal.slice'

const Footer: React.FC = () => {
  // const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    const unsetModalState = (e: { key: string }) => {
      if (e.key === 'Escape') dispatch(unsetModal()), dispatch(unsetMessageModal())
    }
    document.addEventListener('keydown', e => unsetModalState(e))
    return (
      dispatch(unsetModal()),
      dispatch(unsetMessageModal()),
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
      <MenuModal />
      <LoginModal />
      <MessageModal />
      <DashboardModal />
    </footer>
  )
}

export default Footer
