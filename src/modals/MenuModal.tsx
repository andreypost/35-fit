import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
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
import { selectMenuModalActive, unsetMenuModal } from './modal.slice'
import { User } from 'components/User'
import { CrossRedSVG } from 'components/icons'

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

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: column;
      padding: 40px;
      text-align: center;

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
  &.menuActive {
    z-index: 99;
    opacity: 1;
    transition: z-index 0.1s, opacity 0.4s 0.1s;

    nav {
      transform: scale(1);
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
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(unsetMenuModal())
      }}
    >
      <nav>
        <CrossRedSVG className="cross_icon" onClick={() => dispatch(unsetMenuModal())} />
        <ul>
          <li>
            <Link
              to={TRAIN_ROUTE}
              style={{
                color: useLocation().pathname.includes(TRAIN_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Training')}
            </Link>
          </li>
          <li>
            <Link
              to={PRICE_ROUTE}
              style={{
                color: useLocation().pathname.includes(PRICE_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Pricing')}
            </Link>
          </li>
          <li>
            <Link
              to={SCHEDULE_ROUTE}
              style={{
                color: useLocation().pathname.includes(SCHEDULE_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Schedule')}
            </Link>
          </li>
          <li>
            <Link
              to={TEAM_ROUTE}
              style={{
                color: useLocation().pathname.includes(TEAM_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Team')}
            </Link>
          </li>
          <li>
            <Link
              to={CLUB_ROUTE}
              style={{
                color: useLocation().pathname.includes(CLUB_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Club')}
            </Link>
          </li>
          <li>
            <Link
              to={FAQ_ROUTE}
              style={{
                color: useLocation().pathname.includes(FAQ_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Faq')}
            </Link>
          </li>
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
