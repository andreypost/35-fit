import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RESERVE_ROUTE, } from 'utils/routes.constants'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectMenuModalActive, unsetMenuModal } from './modal.slice'
import { User } from 'components/User'
import { CrossRedSVG } from 'components/icons'
import { NavigationLinks } from 'components/NavigationLinks'

export const BaseDiv = styled.div`
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

  @media (min-width: 992px) {
    display: none;
  }

  nav {
    transform: scale(0);
    box-sizing: border-box;
    width: 90%;
    margin: 10vh auto;
    border-radius: 6px;
    box-shadow: 0 8px 24px rgb(0 0 0 / 15%);
    background: #fff;
    transition: transform 0.6s;
    position: relative;

    .cross_icon {
      position: absolute;
      right: 15px;
      top: 15px;
      width: 24px;
      height: 24px;
    }
  }
  &.menuActive, &.dashboarActive, &.loginActive, &.messageActive {
    z-index: 99;
    opacity: 1;
    transition: z-index 0.1s, opacity 0.4s 0.1s;

    nav {
      transform: scale(1);
    }
  }
`

export const BaseUl = styled(BaseDiv)`
  nav {
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: column;
      padding: 40px;
      text-align: center;
    }
`

const Div = styled(BaseUl)`
  nav {
    ul {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      // flex-flow: column;
      // padding: 40px;
      // text-align: center;

      li {
        width: 100%;
        max-width: 280px;

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

      .signOut .user {
        justify-content: space-between;
        .user_face {
          width: 36px;
          height: 36px;
          margin-right: -20px;
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
  }
`

export const MenuModal = (props: { user: any }) => {
  const { t } = useTranslation(),
    modalState = useAppSelector(selectMenuModalActive),
    dispatch = useAppDispatch(),
    user = props.user
  // console.log('MenuModal: ')

  return (
    <Div
      className={modalState}
      onClick={e => e.target === e.currentTarget && dispatch(unsetMenuModal())}
    >
      <nav>
        <CrossRedSVG className="cross_icon" onClick={() => dispatch(unsetMenuModal())} />
        <ul>
          <NavigationLinks />
          <li className={'login ' + (user ? 'signOut' : 'signIn')}>
            {useMemo(
              () => (
                <User user={user} />
              ),
              [user],
            )}
            {/* {user ? <div className="signOut" onClick={() => firebaseAuth.signOut()}>{t('nav.Sign out')}</div> : <div className="login" onClick={() => dispatch(loginModal())}>{t('nav.Login')}</div>} */}
            {/* {user ? <div className="signout" onClick={() => auth.signOut()}>{t('nav.Sign out')}</div> : <div className="login" onClick={login}>{t('nav.Login')}</div>} */}
          </li>
          <li className="buyСlass">
            <Link to={RESERVE_ROUTE}>{t('nav.Buy')}</Link>
          </li>
        </ul>
      </nav>
    </Div>
  )
}
