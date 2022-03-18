import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch } from 'utils/hooks'
import { loginModal, dashModal, unsetDashModal } from 'modals/modal.slice'
import empty_user from '../img/empty_user.png'
import { LangArrowSVG } from 'img/icons'

const Div = styled.div`
  height: 42px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 32px;
  border: 2px solid #e8e8e8;
  background-color: white;
  transition: background-color 0.2s;
  .user_name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: #737373;
    transition: color 0.2s;
  }
  .user_face {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .user_arrow {
    display: none;
  }
  &.header_nav {
    @media (max-width: 992px) {
      width: 42px;
      justify-content: center;
      .user_name {
        display: none;
      }
    }
    @media (min-width: 993px) {
      width: 140px;
      padding-left: 4px;
      padding-right: 2px;
      justify-content: space-between;
    }
    &.loggedIn {
      @media (min-width: 993px) {
        justify-content: center;
        .user_face {
          display: none;
        }
      }
    }
    @media (hover: hover) {
      cursor: pointer;
      &:hover {
        background-color: #59b894;
        .user_name {
          color: white;
        }
      }
    }
  }
  &.menu_modal {
    @media (max-width: 992px) {
      padding-left: 4px;
      padding-right: 2px;
      justify-content: space-between;
    }
    &.loggedIn {
      @media (max-width: 993px) {
        justify-content: center;
        .user_face {
          display: none;
        }
      }
    }
    @media (hover: hover) {
      cursor: pointer;
      &:hover {
        background-color: #59b894;
        .user_name {
          color: white;
        }
      }
    }
  }
  &.dashboard_modal {
    height: 100%;
    justify-content: space-between;
    border-radius: unset;
    border: unset;
    margin-bottom: 10px;
    padding: 0 20px 16px;
    border-bottom: 2px solid #e8e8e8;
    .user_name {
      order: 2;
      font-size: 14px;
      font-weight: 600;
      color: #004;
    }
    .user_face {
      order: 1;
    }
    .user_arrow {
      display: inline-block;
      order: 3;
      width: 16px;
      height: 11px;
      fill: #737373;
      transition: transform 0.2s;
    }
    @media (hover: hover) {
      cursor: pointer;
      &:hover {
        .user_name {
          color: #ff6376;
        }
        .user_arrow {
          fill: #ff6376;
          transform: rotate(180deg);
        }
      }
    }
  }
`
export const User = ({ user, styles }) => {
  const dispatch = useAppDispatch(),
    { t } = useTranslation()

  const handleModals = () => {
    if (styles === 'dashboard_modal') {
      dispatch(unsetDashModal())
      return
    }
    user ? dispatch(dashModal()) : dispatch(loginModal())
  }

  return (
    <Div
      className={styles + (user ? ' loggedOut' : ' loggedIn')}
      onClick={handleModals}
    >
      <p className="user_name">{(user && user.displayName) || t('nav.Login')}</p>
      <img
        src={(user && user.photoURL) || empty_user}
        onError={(e: any) => (e.target.onerror = null, e.target.src = empty_user)}
        className="user_face"
        alt="user's face" />
      <LangArrowSVG className="user_arrow" />
    </Div>
  )
}