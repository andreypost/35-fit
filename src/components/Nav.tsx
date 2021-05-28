import React, { useContext, useState } from 'react'
import './nav.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TRAINING_ROUTE, PRICING_ROUTE, MAIN_ROUTE, FLOWER_ROUTE, CHAT_ROUTE } from '../utils/consts'
import { FirebaseAuthContext } from '..'
import { useAuthState } from 'react-firebase-hooks/auth'

// const Locale = localStorage['locale'] ? localStorage['locale'] : 'en';

const Nav: React.FC = (): any => {
  const { t, i18n } = useTranslation()
  const { firebase, auth } = useContext(FirebaseAuthContext)
  const [user] = useAuthState(auth)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(provider)
  }
  return (
    <nav className="section">
      <p>{t('nav.Training')}</p>
      <Link to={MAIN_ROUTE}>
        <svg className="logo">
          <use xlinkHref="#logo"></use>
        </svg>
      </Link>
      <ul>
        {user ? <li><Link to={FLOWER_ROUTE}>flower</Link></li> : null}
        {user ? <li><Link to={CHAT_ROUTE}>chat</Link></li> : null}
        <li>
          <Link to={TRAINING_ROUTE}>{t('nav.Training')}</Link>
        </li>
        <li>
          <Link to={PRICING_ROUTE}>{t('nav.Pricing')}</Link>
        </li>
        {/* <li>
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
        </li> */}
        <li>
          {user ? <button onClick={() => auth.signOut()}>{t('nav.Sign out')}</button> : <button onClick={login}>{t('nav.Login')}</button>}
        </li>
        {/* <li>
          <Link to={MAIN_ROUTE}>{t('nav.Buy')}</Link>
        </li> */}
      </ul>
      <ul>
        <li onClick={() => i18n.changeLanguage('en')}>EN</li>
        <li onClick={() => i18n.changeLanguage('ee')}>EST</li>
        <li onClick={() => i18n.changeLanguage('de')}>DEU</li>
      </ul>
      <div>
        {user ?
          <img src={user.photoURL} alt="" /> :
          <p>{t('nav.Login')}</p>
        }
      </div>
      <Link to={MAIN_ROUTE}>{t('nav.Buy')}</Link>
      <button className="burger">
        <span></span>
      </button>
    </nav>
  )
}

// export default withNamespaces()(Nav);
export default Nav
