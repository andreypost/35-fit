import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch } from 'utils/hooks'
import { loginModal, dashModal } from 'modals/modal.slice'
import empty_user from '../img/empty_user.png'

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 32px;
  border: 2px solid #e8e8e8;
  background-color: white;
  transition: background-color 0.2s;

  .user_face {
    border-radius: 50%;
    // border: 2px solid white;
  }

  @media (max-width: 992px) {
    width: 38px;
    height: 38px;
    // justify-content: center;

    .user_name {
      display: none;
    }

    &.loggedOut {
      // width: 38px;

      .user_face {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (min-width: 993px) {
    // monitor styles
    width: 140px;
    height: 42px;
    padding-left: 4px;
    padding-right: 2px;
    
    &.loggedOut {
      justify-content: space-between;
    }

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
    }

    &:hover {
      background-color: #59b894;
      p {
        color: white;
      }
    }

  }

  @media (hover: hover) {
    cursor: pointer;
  }
`
export const User = (props: { user: any }) => {
  const dispatch = useAppDispatch(),
    { t } = useTranslation(),
    user = props.user

  return (
    <Div
      className={'user ' + (user ? 'loggedOut' : 'loggedIn')}
      onClick={() => (user ? dispatch(dashModal()) : dispatch(loginModal()))}
    >
      <p className="user_name">{(user && user.displayName) || t('nav.Login')}</p>
      <img
        src={(user && user.photoURL) || empty_user}
        onError={(e: any) => { e.target.onerror = null; e.target.src = empty_user }}
        className="user_face"
        style={{ display: !user ? 'none' : 'block' }}
        alt="user's face" />
    </Div>
  )
}