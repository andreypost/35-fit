import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { TRAIN_ROUTE, PRICE_ROUTE, TEAM_ROUTE, SCHEDULE_ROUTE, CLUB_ROUTE, FAQ_ROUTE, RESERVE_ROUTE } from 'utils/routes.constants'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectModalActive, unsetModal, loginModal } from './modal.slice'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FirebaseAuthContext } from '..'

const Div = styled.div`
  opacity         : 0;
  position        : fixed;
  z-index         : -99;
  left            : 0;
  top             : 0;
  width           : 100%;
  height          : 200%;
  overflow        : auto;
  background-color: rgba(0, 0, 0, 0.2);
  transition      : opacity .4s, z-index .1s .4s;

  &.menuActive {
    z-index   : 99;
    opacity   : 1;
    transition: z-index .1s, opacity .4s .1s;

    ul {
      transform: scale(1);
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column;
    min-height: 105px;
    margin-top: 30vh;
    padding: 20px 20px 10px;
    background: #fedeff;
    text-align: center;
    box-sizing   : border-box;
    width        : 90%;
    margin       : 15vh auto 0;
    padding      : 92px 48px 30px;
    border-radius: 30px;
    box-shadow   : 0px 16px 16px rgba(0, 0, 0, 0.25);
    background   : $light_peach_color;
    transform    : scale(0);
    transition   : transform .6s;
    
    li {

      a {

      }

      font-size: 18px;
      line-height: 21px;
      margin-bottom: 10px;

      .signout {

      }
      .login {

      }
      
    }
  }`

const Menu = () => {
  const { t } = useTranslation()
  const modalState = useAppSelector(selectModalActive)
  const dispatch = useAppDispatch()
  const { firebase, auth } = useContext(FirebaseAuthContext)
  const [user] = useAuthState(auth)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(provider)
  }
  return (
    <Div className={modalState} onClick={e => { if (e.target === e.currentTarget) dispatch(unsetModal()) }}>
      <ul>
        <li className="train">
          <Link to={TRAIN_ROUTE}>{t('nav.Training')}</Link>
        </li>
        <li className="price">
          <Link to={PRICE_ROUTE}>{t('nav.Pricing')}</Link>
        </li>
        <li className="schedule">
          <Link to={SCHEDULE_ROUTE}>{t('nav.Schedule')}</Link>
        </li>
        <li className="team">
          <Link to={TEAM_ROUTE}>{t('nav.Team')}</Link>
        </li>
        <li className="club">
          <Link to={CLUB_ROUTE}>{t('nav.Club')}</Link>
        </li>
        <li className="faq">
          <Link to={FAQ_ROUTE}>{t('nav.Faq')}</Link>
        </li>
        <li>
          {user ? <div className="signout" onClick={() => auth.signOut()}>{t('nav.Sign out')}</div> : <div className="login" onClick={() => dispatch(loginModal())}>{t('nav.Login')}</div>}
          {/* {user ? <div className="signout" onClick={() => auth.signOut()}>{t('nav.Sign out')}</div> : <div className="login" onClick={login}>{t('nav.Login')}</div>} */}
        </li>
        <li>
          <Link to={RESERVE_ROUTE}>{t('nav.Buy')}</Link>
        </li>
      </ul>
    </Div>
  )
}

export default Menu
