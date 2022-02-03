import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MAIN_ROUTE } from 'utils/routes.constants'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectDashModalActive, unsetDashModal } from './modal.slice'
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
      ddisplay: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: column;
      padding: 40px;
      text-align: center;

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
    }
  }

  &.dashboarActive {
    z-index: 99;
    opacity: 1;
    transition: z-index 0.1s, opacity 0.4s 0.1s;

    nav {
      transform: scale(1);
    }
  }
`

interface Props {
  user: any
  login: () => void
  firebaseAuth: any
}

export const DashboardModal = ({ user, login, firebaseAuth }: Props) => {
  const { t } = useTranslation(),
    modalState = useAppSelector(selectDashModalActive),
    dispatch = useAppDispatch()

  // console.log('DashboardModal: ')
  return (
    <Div
      className={modalState}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(unsetDashModal())
      }}
    >
      <nav>
        <CrossRedSVG className="cross_icon" onClick={() => dispatch(unsetDashModal())} />
        <ul>
          <li>
            <Link
              to={MAIN_ROUTE}
              style={{
                color: useLocation().pathname.includes(MAIN_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Dashboard')}
            </Link>
          </li>
          <li>
            <Link
              to={MAIN_ROUTE}
              style={{
                color: useLocation().pathname.includes(MAIN_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Classes')}
            </Link>
          </li>
          <li>
            <Link
              to={MAIN_ROUTE}
              style={{
                color: useLocation().pathname.includes(MAIN_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Progress')}
            </Link>
          </li>
          <li>
            <Link
              to={MAIN_ROUTE}
              style={{
                color: useLocation().pathname.includes(MAIN_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Contract')}
            </Link>
          </li>
          <li>
            <Link
              to={MAIN_ROUTE}
              style={{
                color: useLocation().pathname.includes(MAIN_ROUTE)
                  ? '#000044'
                  : '#737373',
              }}
            >
              {t('nav.Profile')}
            </Link>
          </li>
          <li
            onClick={() => (firebaseAuth.signOut(), dispatch(unsetDashModal()))}
          >
            {t('nav.Sign out')}
          </li>
        </ul>
      </nav>
    </Div>
  )
}
