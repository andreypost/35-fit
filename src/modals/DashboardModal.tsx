import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MAIN_ROUTE } from 'utils/routes.constants'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectModalActive, unsetModal } from './modal.slice'
import { FirebaseAuthContext } from '../index'

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

  @media (orientation: landscape) {
    height          : 100%;
  }

  &.dashboarActive {
    z-index   : 99;
    opacity   : 1;
    transition: z-index .1s, opacity .4s .1s;

    ul {
      transform: scale(1);
    }
  }
  
  ul {
    transform    : scale(0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column;
    min-height: 105px;
    margin-top: 30vh;
    padding: 20px 20px 10px;
    text-align: center;
    box-sizing   : border-box;
    width        : 90%;
    margin       : 15vh auto 0;
    padding      : 92px 48px 30px;
    border-radius: 30px;
    box-shadow   : 0px 16px 16px rgba(0, 0, 0, 0.25);
    background   : white;
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

const DashboardModal = () => {
  const { t } = useTranslation(),
    modalState = useAppSelector(selectModalActive),
    dispatch = useAppDispatch(),
    { user, login, firebaseAuth } = useContext(FirebaseAuthContext)

  return (
    <Div className={modalState} onClick={e => { if (e.target === e.currentTarget) dispatch(unsetModal()) }}>
      Dashboard
      <ul>
        <li className="train">
          <Link to={MAIN_ROUTE}>{t('nav.Dashboard')}</Link>
        </li>
        <li className="price">
          <Link to={MAIN_ROUTE}>{t('nav.Classes')}</Link>
        </li>
        <li className="schedule">
          <Link to={MAIN_ROUTE}>{t('nav.Progress')}</Link>
        </li>
        <li className="team">
          <Link to={MAIN_ROUTE}>{t('nav.Contract')}</Link>
        </li>
        <li className="club">
          <Link to={MAIN_ROUTE}>{t('nav.Profile')}</Link>
        </li>
        <li className="signout" onClick={() => (firebaseAuth.signOut(), dispatch(unsetModal()))}>{t('nav.Sign out')}</li>
      </ul>
    </Div>
  )
}

export default DashboardModal
