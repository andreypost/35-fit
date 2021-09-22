import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  return (
    <footer>
      <div className="section">
        <ul>
          <li>
            <Link to="/Faq">{t('footer.Careers')}</Link>
          </li>
          <li>{/* <Link to="/Faq">{t('footer.Careers')}</Link> */}</li>
          <li>{/* <Link to="/">{t('footer.Privacy')}</Link> */}</li>
          <li>{/* <Link to="/">{t('footer.Terms')}</Link> */}</li>
        </ul>
      </div>
    </footer>
  )
}
