import React, { useContext } from 'react'
import styled from 'styled-components'
import { FirebaseAuthContext } from '../index'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'utils/hooks'
import { dashboardModal, loginModal } from 'modals/modal.slice'

const Div = styled.div`
    display         : flex;
    align-items     : center;
    justify-content : center;
    box-sizing      : border-box;
    padding         : 0 12px;
    border-radius   : 32px;
    border          : 2px solid #E8E8E8;
    background-color: white;
    transition      : background-color .2s;

    &:hover {
      background-color: #59B894;
      p {
        color           : white;
      }
    }

    p {
      white-space  : nowrap;
      text-overflow: ellipsis;
      overflow     : hidden;
      text-align   : center;
      font-size    : 14px;
      color        : #737373;
      transition      : color .2s;
    }

    .user_face {
      border-radius: 50%;
      border       : 2px solid white;
      margin-right : -13px;
    }

    @media (max-width: 991px) {
      // mobile styles
      width : 80px;
      height: 36px;

      &.loggedOut {
        width: 36px;

        .user_face {
          width       : 30px;
          height      : 30px;
          margin-right: unset;
        }
      }
    }

    @media (min-width: 992px) {
      // monitor styles
      width : 125px;
      height: 42px;

      &:hover {
        cursor: pointer;
      }

      .user_face {
        width : 36px;
        height: 36px;
      }
    }
`

const User: React.FC = () => {
  const { user } = useContext(FirebaseAuthContext),
    dispatch = useAppDispatch(),
    { t } = useTranslation()

  return (
    <Div className={'user ' + (user ? 'loggedOut' : 'loggedIn')} onClick={() => user ? dispatch(dashboardModal()) : dispatch(loginModal())}>
      {user ?
        <>
          <p className="user_name">{user.displayName || null}</p>
          <img className="user_face" src={user.photoURL || null} alt="" />
        </>
        :
        <p>{t('nav.Login')}</p>
      }
    </Div>

  )
}

export default User
