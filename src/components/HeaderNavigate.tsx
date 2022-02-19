import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectBurgerValue, menuModal } from 'modals/modal.slice'
import { MAIN_ROUTE, RESERVE_ROUTE, } from 'utils/routes.constants'
import { Language } from './Language'
import { User } from './User'
import { LogoSVG } from './icons'
import { NavigationLinks } from './NavigationLinks'

const Header = styled.header`
  .navigate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;

    a {
      white-space: nowrap;
    }

    &_logo svg {
      display: block;
      fill: #000044;
      margin-right: 10px;
    }

    &_menu {
      display: grid;
      grid-auto-flow: column;
      gap: 10px;
      margin-left: auto;
    }

    @media (max-width: 991px) {
      // mobile styles

      &_logo svg {
        width: 100px;
        height: 44px;
      }

      &_routes,
      &_buy {
        display: none;
      }

      &_burger {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;

        span,
        span::before,
        span::after {
          content: '';
          width: 30px;
          height: 3px;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 2px;
          transform-origin: 50% 50%;
          background: #59b894;
          transition: all 0.45s cubic-bezier(0.45, 0.45, 0.37, 1.36);
        }

        span {
          display: inline-block;
          position: relative;

          &::before {
            transform: translateY(-0.55rem);
          }

          &::after {
            transform: translateY(0.55rem);
          }
        }

        &.active {
          span {
            transform: translate(1rem);
            background-color: transparent;

            &::before {
              transform: translate(-1rem) rotate(135deg);
              background-color: #ff6376;
            }

            &::after {
              transform: translate(-1rem) rotate(-135deg);
              background-color: #ff6376;
            }
          }
        }
      }
    }

    @media (min-width: 992px) {
      // monitor styles

      &_burger {
        display: none;
      }

      &_logo svg {
        width: 118px;
        height: 50px;
        transition: fill 0.2s;
      }

      &_routes {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        align-items: center;

        a {
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s;

          &:hover {
            color: #ff6376 !important;
          }
        }
      }

      &_buy {
        display: flex;
        align-items: center;
        justify-content: center;
        @include green_button;
        box-sizing: border-box;
        width: 188px;
        padding: 0 12px;
        border: none;
        border-radius: 32px;
        background-color: #59b894;
        color: white;
        transition: background-color 0.2s;

        @media (max-width: 991px) {
          height: 38px;
        }

        @media (min-width: 992px) {
          height: 42px;
        }

        &:hover {
          background-color: #000044;
        }

        &:active {
          color: #ff6376;
        }
      }
    }

    @media (min-width: 1080px) and (max-width: 1279px) {
      &_logo {
        margin-right: 20px;
      }

      &_routes,
      &_menu {
        gap: 20px;
      }
    }

    @media (min-width: 1280px) {
      &_logo {
        margin-right: 40px;
      }

      &_routes,
      &_menu {
        gap: 40px;
      }
    }

    @media (hover: hover) {
      &_logo svg:hover {
        fill: #59b894;
      }
    }
  }
`

export const HeaderNavigate = (props: { user: any }) => {
  const { t } = useTranslation(),
    dispatch = useAppDispatch(),
    burgerState = useAppSelector(selectBurgerValue),
    user = props.user

  // console.log('HeaderNavigate: ', 'storage')

  return (
    <Header>
      <nav className="section navigate">
        <Link to={MAIN_ROUTE} className="navigate_logo">
          <LogoSVG />
        </Link>
        <ul className="navigate_routes">
          <NavigationLinks />
        </ul>
        <div className="navigate_menu">
          {useMemo(
            () => (
              <Language />
            ),
            [],
          )}
          {useMemo(
            () => (
              <User user={user} />
            ),
            [user],
          )}
          <Link to={RESERVE_ROUTE} className="navigate_buy">
            {t('nav.Buy')}
          </Link>
          <div
            className={'navigate_burger ' + burgerState}
            onClick={() => dispatch(menuModal())}
          >
            <span></span>
          </div>
        </div>
      </nav>
    </Header>
  )
}
