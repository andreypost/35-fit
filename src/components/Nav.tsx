import React from 'react'
import './Nav.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// const Locale = localStorage['locale'] ? localStorage['locale'] : 'en';

const Nav = (): any => {
  const { t, i18n } = useTranslation()
  return (
    <nav className="section">
      <p>{t('nav.Training')}</p>
      <Link to="/">
        <svg className="logo">
          <use xlinkHref="#logo"></use>
        </svg>
      </Link>
      <ul>
        <li>
          <Link to="/training">{t('nav.Training')}</Link>
        </li>
        <li>
          <Link to="/pricing">{t('nav.Pricing')}</Link>
        </li>
        <li>
          <Link to="/schedule">{t('nav.Schedule')}</Link>
        </li>
        <li>
          <Link to="/team">{t('nav.Team')}</Link>
        </li>
        <li>
          <Link to="/club">{t('nav.Club')}</Link>
        </li>
        <li>
          <Link to="/faq">{t('nav.Faq')}</Link>
        </li>
        <li>{t('nav.Login')}</li>
        <li>
          <Link to="/">{t('nav.Buy')}</Link>
        </li>
      </ul>
      <ul>
        <li onClick={() => i18n.changeLanguage('en')}>EN</li>
        <li onClick={() => i18n.changeLanguage('ee')}>EST</li>
        <li onClick={() => i18n.changeLanguage('de')}>DEU</li>
      </ul>
      <div>
        <p>{t('nav.Login')}</p>
      </div>
      <Link to="/">{t('nav.Buy')}</Link>
      <button className="burger">
        <span></span>
      </button>
      <Link to="/flower">Flower</Link>
    </nav>
  )
}

// export default withNamespaces()(Nav);
export default Nav
