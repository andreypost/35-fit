import { useEffect } from 'react'
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'utils/hooks'
import { unsetAllModal } from 'modals/modal.slice'
import { CHLProps } from 'types/interface'

export const HeaderBanner = ({ children, className, title, descript }: CHLProps) => {
  const dispatch = useAppDispatch(),
  { t } = useTranslation()

  const keyDownHandler = (e: { key: string }) => {
    (e.key === 'Escape') && dispatch(unsetAllModal())
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.addEventListener('keydown', e => keyDownHandler(e))
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      dispatch(unsetAllModal())
    }
  }, [])

  return (
    <div className={`header_banner ${className}`}>
      <section className="section">
          <h1>{t('title')}</h1>
          <h3></h3>
        </section>
      {children}
    </div>
  )
}
