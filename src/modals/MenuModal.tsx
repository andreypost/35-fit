import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  TRAIN_ROUTE,
  PRICE_ROUTE,
  TEAM_ROUTE,
  SCHEDULE_ROUTE,
  CLUB_ROUTE,
  FAQ_ROUTE,
  RESERVE_ROUTE,
} from 'utils/routes.constants'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectModalActive, unsetModal } from './modal.slice'
import { FirebaseAuthContext } from '../index'
import User from 'components/User'

const Div = styled.div`
  opacity: 0;
  position: fixed;
  z-index: -99;
  left: 0;
  top: 0;
  width: 100%;
  height: 200%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s, z-index 0.1s 0.4s;

  @media (orientation: landscape) {
    height: 100%;
  }

  &.menuActive {
    z-index: 99;
    opacity: 1;
    transition: z-index 0.1s, opacity 0.4s 0.1s;

    ul {
      transform: scale(1);
    }
  }

  ul {
    transform: scale(0);
    box-sizing: border-box;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column;
    margin: 15vh auto;
    padding: 40px;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0 8px 24px rgb(0 0 0 / 15%);
    background: #fff;
    transition: transform 0.6s;

    li {
      width: 100%;
      max-width: 260px;

      a {
        font-size: 18px;
        line-height: 48px;
        font-weight: 900;
        color: #737373;
      }
    }

    .login {
      margin: 40px auto 20px;

      .user {
        width: 100%;
        height: 42px;
        padding: 0 20px;
      }
    }

    .signIn {
      p {
        font-weight: 700;
        color: #59b894;
      }
      &:hover p {
        color: white;
      }
    }

    .signOut {
      .user {
        justify-content: space-between;
        .user_face {
          width: 36px;
          height: 36px;
          margin-right: -20px;
        }
      }
    }

    .buyСlass a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      border-radius: 32px;
      background-color: #59b894;
      color: white;
    }
  }
`

const LoginModal = () => {
  const { t } = useTranslation(),
    modalState = useAppSelector(selectModalActive),
    dispatch = useAppDispatch(),
    { user } = useContext(FirebaseAuthContext)

  return (
    <Div
      className={modalState}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(unsetModal())
      }}
    >
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
        <li className={'login ' + (user ? 'signOut' : 'signIn')}>
          <User />
          {/* {user ? <div className="signOut" onClick={() => firebaseAuth.signOut()}>{t('nav.Sign out')}</div> : <div className="login" onClick={() => dispatch(loginModal())}>{t('nav.Login')}</div>} */}
          {/* {user ? <div className="signout" onClick={() => auth.signOut()}>{t('nav.Sign out')}</div> : <div className="login" onClick={login}>{t('nav.Login')}</div>} */}
        </li>
        <li className="buyСlass">
          <Link to={RESERVE_ROUTE}>{t('nav.Buy')}</Link>
        </li>
      </ul>
    </Div>
  )
}

export default LoginModal
