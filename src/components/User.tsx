import React, { useContext } from 'react'
import styled from 'styled-components'
import { FirebaseAuthContext } from '../index'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'utils/hooks'
import { dashboardModal } from 'modals/modal.slice'

const Div = styled.div`

`

const User: React.FC = () => {
  const { user, login } = useContext(FirebaseAuthContext),
    dispatch = useAppDispatch(),
    { t } = useTranslation()

  return (
    <div className="navigate_login" onClick={() => user ? dispatch(dashboardModal()) : login()}>
      {user ?
        <>
          <p className="login_name">{user.displayName || null}</p>
          <img className="login_face" src={user.photoURL || null} alt="" />
        </>
        :
        <>
          {/* <div className="navigate_login" onClick={() => dispatch(loginModal())}> */}
          <p>{t('nav.Login')}</p>
        </>
      }
    </div>

  )
}

export default User
