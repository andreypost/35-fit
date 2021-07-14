import React, { useContext } from 'react'
import styled from 'styled-components'
import { FirebaseAuthContext } from '../index'
import { useTranslation } from 'react-i18next'

const Div = styled.div`

`

const User: React.FC = () => {
  const { user, login, firebaseAuth } = useContext(FirebaseAuthContext),
    { t } = useTranslation()

  return (
    <div className="navigate_login" onClick={() => user ? firebaseAuth.signOut() : login()}>
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
