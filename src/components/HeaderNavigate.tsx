import React, { useMemo } from 'react'
import { userType } from 'types/commonPropTypes'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectBurgerValue, menuModal } from 'utils/modal.slice'
import { MAIN_ROUTE, publicLinks, RESERVE_ROUTE } from 'utils/routes.constants'
import { Language } from './Language'
import { User } from './User'
import { LogoSVG } from '../img/icons'
import { NavigationLinks } from './NavigationLinks'

const Header = styled.header`
  margin-bottom: -64px;
  z-index: 99;
  padding-top: 20px;
  a {
    white-space: nowrap;
  }
  .navigate_logo svg {
    display: block;
    fill: #000044;
    margin-right: 10px;
  }
  .navigate_menu {
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    margin-left: auto;
  }
  @media (max-width: 992px) {
    .navigate_logo svg {
      width: 100px;
      height: 44px;
    }
    .navigate_routes,
    .navigate_buy {
      display: none;
    }
    .navigate_burger {
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
      @media (hover: hover) {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  @media (min-width: 993px) {
    .navigate_burger {
      display: none;
    }
    .navigate_logo svg {
      width: 118px;
      height: 50px;
      transition: fill 0.2s;
    }
    .navigate_routes {
      display: grid;
      grid-auto-flow: column;
      gap: 10px;
      align-items: center;
      a {
        font-size: 14px;
        transition: color 0.2s;
        &:hover {
          color: #ff6376 !important;
        }
      }
    }
    .navigate_buy {
      box-sizing: border-box;
      width: 188px;
      padding: 0 12px;
      font-size: 14px;
      border-radius: 32px;
      background-color: #59b894;
      transition: background-color 0.2s, border-color 0.2s;
      @media (max-width: 992px) {
        height: 38px;
      }
      @media (min-width: 993px) {
        height: 42px;
      }
      &:hover {
        border-color: white;
        background-color: #000044;
      }
      &:active {
        color: #ff6376;
      }
    }
  }
  @media (min-width: 1080px) and (max-width: 1279px) {
    .navigate_logo {
      margin-right: 20px;
    }
    .navigate_routes,
    .navigate_menu {
      gap: 20px;
    }
  }
  @media (min-width: 1280px) {
    .navigate_logo {
      margin-right: 40px;
    }
    .navigate_routes,
    .navigate_menu {
      gap: 40px;
    }
  }
  @media (hover: hover) {
    .navigate_logo svg:hover {
      fill: #59b894;
    }
  }
  @media (min-width: 993px) {
    margin-bottom: -70px;
  }
`

export const HeaderNavigate = ({ user }) => {
  const { t } = useTranslation(),
    dispatch = useAppDispatch(),
    burgerState = useAppSelector(selectBurgerValue)

  return (
    <Header className="section flex_center_bet relative">
      <Link to={MAIN_ROUTE} className="navigate_logo">
        <LogoSVG />
      </Link>
      <ul className="navigate_routes">
        <NavigationLinks links={publicLinks} bold="b700" color="#737373" />
      </ul>
      <div className="navigate_menu">
        {useMemo(
          () => (
            <Language />
          ),
          []
        )}
        {useMemo(
          () => (
            <User user={user} styles="header_nav" />
          ),
          [user]
        )}
        <Link
          to={RESERVE_ROUTE}
          className="flex_center_center navigate_buy b700 white"
        >
          {t('nav.buy')}
        </Link>
        <div
          className={'navigate_burger flex_center_center ' + burgerState}
          onClick={() => dispatch(menuModal())}
        >
          <span></span>
        </div>
      </div>
    </Header>
  )
}

HeaderNavigate.propTypes = {
  user: userType,
}
