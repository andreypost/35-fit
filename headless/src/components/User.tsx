import { IUser, IStyle } from 'types/interface'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch } from 'utils/hooks'
import { loginModal, dashModal, unsetDashModal } from 'slices/modal.slice'
import empty_user from '../img/empty_user.png'
import { LangArrowSVG } from 'img/icons'
import { useContext } from 'react'
import { AppContext } from '../AppRouter'

const Div = styled.div`
  .user_name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
  @media (hover: hover) {
    cursor: pointer;
  }
  &:hover {
    background-color: #59b894;
    .user_name {
      color: white;
    }
  }
  &.header_nav {
    @media (max-width: 1023px) {
      width: 120px;
    }
    width: 140px;
    padding-left: 8px;
    padding-right: 2px;
    justify-content: space-between;
    &.loggedIn {
      justify-content: center;
      .user_face {
        display: none;
      }
    }
  }
  &.menu_modal {
    @media (max-width: 1023px) {
      width: 100%;
      justify-content: space-between;
      column-gap: 10px;
      padding-left: 8px;
      padding-right: 2px;
      &.loggedIn {
        justify-content: center;
        .user_face {
          display: none;
        }
      }
    }
  }
  &.dashboard_modal {
    width: 100%;
    height: 100%;
    justify-content: space-between;
    column-gap: 10px;
    border-radius: unset;
    border: unset;
    margin-bottom: 10px;
    padding: 0 20px 16px;
    border-bottom: 2px solid #e8e8e8;
    .user_name {
      width: 100%;
      order: 2;
      font-size: 16px;
      color: #004;
    }
    .user_face {
      order: 1;
    }
    .user_arrow {
      display: inline-block;
      order: 3;
      width: 36px;
      height: 11px;
      fill: #737373;
      transition: transform 0.2s;
    }
    &:hover {
      background-color: unset;
      .user_name {
        color: #ff6376;
      }
      .user_arrow {
        fill: #ff6376;
        transform: rotate(180deg);
      }
    }
  }
`

export const User = ({ styleName }: IStyle) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { currentUser } = useContext(AppContext)
  return (
    <Div
      className={
        'light_grey_button ' +
        styleName +
        (currentUser ? ' loggedOut' : ' loggedIn')
      }
      onClick={() =>
        styleName === 'dashboard_modal'
          ? dispatch(unsetDashModal())
          : currentUser
          ? dispatch(dashModal())
          : dispatch(loginModal())
      }
    >
      <p className="user_name b700 green">
        {currentUser?.displayName || currentUser?.name || t('nav.login')}
      </p>
      <img
        src={currentUser?.photoURL || empty_user}
        onError={(e: any) => (
          (e.target.onerror = null), (e.target.src = empty_user)
        )}
        className="user_face"
        alt="user's face"
      />
      <LangArrowSVG className="user_arrow" />
    </Div>
  )
}
