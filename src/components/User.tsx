import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'utils/hooks'
import { dashboardModal, loginModal } from 'modals/modal.slice'

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 12px;
  border-radius: 32px;
  border: 2px solid #e8e8e8;
  background-color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #59b894;
    p {
      color: white;
    }
  }

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    color: #737373;
    transition: color 0.2s;
  }

  .user_face {
    border-radius: 50%;
    border: 2px solid white;
    margin-right: -13px;
  }

  @media (max-width: 991px) {
    // mobile styles
    width: 80px;
    height: 36px;

    &.loggedOut {
      width: 36px;

      .user_face {
        width: 30px;
        height: 30px;
        margin-right: unset;
      }
    }
  }

  @media (min-width: 992px) {
    // monitor styles
    width: 125px;
    height: 42px;

    .user_face {
      width: 36px;
      height: 36px;
    }
  }
  @media (hover: hover) {
    cursor: pointer;
  }
`

interface Props {
  user: any
}

export const User: React.FC<Props> = ({ user }: Props) => {
  const dispatch = useAppDispatch(),
    { t } = useTranslation()
  console.log('user: ', user)

  return (
    <Div
      className={'user ' + (user ? 'loggedOut' : 'loggedIn')}
      onClick={() =>
        user ? dispatch(dashboardModal()) : dispatch(loginModal())
      }
    >
      {user ? (
        <>
          <p className="user_name">{user.displayName || null}</p>
          <img className="user_face" src={user.photoURL || null} alt="" />
        </>
      ) : (
        <p>{t('nav.Login')}</p>
      )}
    </Div>
  )
}
