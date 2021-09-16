import React, { useContext, useMemo } from 'react'
import './Navigate.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectBurgerValue, menuModal } from 'modals/modal.slice'
import {
  TRAIN_ROUTE,
  PRICE_ROUTE,
  MAIN_ROUTE,
  TEAM_ROUTE,
  SCHEDULE_ROUTE,
  CLUB_ROUTE,
  FAQ_ROUTE,
  RESERVE_ROUTE,
} from 'utils/routes.constants'
import { Language } from './Language'
import { User } from './User'
import { FirebaseAuthContext } from '../index'

export const Navigate: React.FC = () => {
  const { t } = useTranslation(),
    dispatch = useAppDispatch(),
    burgerState = useAppSelector(selectBurgerValue),
    { user } = useContext(FirebaseAuthContext)
  console.log('Navigate: ')

  return (
    <>
      <nav className="navigate">
        <Link to={MAIN_ROUTE} className="navigate_logo">
          <svg viewBox="0 0 118 50" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M76.0192 50H59H41.9803H24.9612C21.5292 50 18.253 49.2971 15.2692 48.0273C12.2858 46.7575 9.59476 44.9218 7.33229 42.6564C5.07034 40.3904 3.23701 37.6952 1.96969 34.7067C0.701842 31.7183 0 28.4376 0 24.9997C0 21.5624 0.701842 18.2812 1.96969 15.2928C3.23701 12.3048 5.07034 9.60906 7.33229 7.34362C9.59476 5.07818 12.2858 3.24201 15.2692 1.97221C18.253 0.702926 21.5292 0 24.9612 0H41.9803H59H76.0192H93.0383C96.4703 0 99.747 0.702926 102.73 1.97221C105.714 3.24201 108.405 5.07818 110.668 7.34362C112.93 9.60906 114.763 12.3048 116.03 15.2928C117.298 18.2812 118 21.5624 118 24.9997C118 28.4376 117.298 31.7183 116.03 34.7067C114.763 37.6952 112.93 40.3904 110.668 42.6564C108.405 44.9218 105.714 46.7575 102.73 48.0273C99.747 49.2971 96.4703 50 93.0383 50H76.0192Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M91.1125 19.3186H80.7947C80.3574 19.3186 80.0033 19.6717 80.0033 20.1084C80.0033 20.5452 80.3574 20.8987 80.7947 20.8987H85.1619V29.873C85.1619 30.3092 85.5165 30.6628 85.9534 30.6628C86.3902 30.6628 86.7443 30.3092 86.7443 29.873V20.8987H91.1125C91.5493 20.8987 91.9039 20.5452 91.9039 20.1084C91.9039 19.6717 91.5493 19.3186 91.1125 19.3186ZM75.9788 30.6628C76.4151 30.6628 76.7697 30.3092 76.7697 29.873V20.1084C76.7697 19.6722 76.4151 19.3186 75.9788 19.3186C75.542 19.3186 75.1874 19.6722 75.1874 20.1084V29.873C75.1874 30.3092 75.542 30.6628 75.9788 30.6628ZM70.8469 24.2165H61.8648V20.8988H70.8521C71.2889 20.8988 71.6435 20.5452 71.6435 20.1084C71.6435 19.6722 71.2889 19.3181 70.8521 19.3181H61.0744C60.6376 19.3181 60.283 19.6722 60.283 20.1084V24.9555C60.2814 24.973 60.2778 24.9889 60.2778 25.0063C60.2778 25.0238 60.2814 25.0397 60.283 25.0572V29.8914C60.283 30.3276 60.6376 30.6818 61.0744 30.6818C61.5107 30.6818 61.8648 30.3276 61.8648 29.8914V25.7967H70.8469C71.2837 25.7967 71.6378 25.4431 71.6378 25.0063C71.6378 24.5696 71.2837 24.2165 70.8469 24.2165ZM36.6653 19.3345H26.8876C26.4503 19.3345 26.0962 19.6881 26.0962 20.1243C26.0962 20.5606 26.4503 20.9147 26.8876 20.9147H35.8738V24.2165H26.8876C26.4503 24.2165 26.0962 24.5696 26.0962 25.0063C26.0962 25.4431 26.4503 25.7967 26.8876 25.7967H35.8738V29.0985H26.8876C26.4503 29.0985 26.0962 29.4527 26.0962 29.8889C26.0962 30.3251 26.4503 30.6787 26.8876 30.6787H36.6653C37.1021 30.6787 37.4567 30.3251 37.4567 29.8889V20.1243C37.4567 19.6881 37.1021 19.3345 36.6653 19.3345ZM51.6411 30.6787H41.8635C41.4267 30.6787 41.0721 30.3251 41.0721 29.8889C41.0721 29.4527 41.4267 29.0985 41.8635 29.0985H50.8502V25.7967H41.8635C41.4267 25.7967 41.0721 25.4431 41.0721 25.0063V20.1243C41.0721 19.6881 41.4267 19.3345 41.8635 19.3345H51.6411C52.0785 19.3345 52.4326 19.6881 52.4326 20.1243C52.4326 20.5606 52.0785 20.9147 51.6411 20.9147H42.6544V24.2165H51.6411C52.0785 24.2165 52.4326 24.5701 52.4326 25.0063V29.8889C52.4326 30.3251 52.0785 30.6787 51.6411 30.6787Z"
              fill="white"
            />
          </svg>
        </Link>
        <ul className="navigate_routes">
          <li className="train">
            <Link to={TRAIN_ROUTE}>{t('nav.Training')}</Link>
          </li>
          <li className="price">
            <Link to={PRICE_ROUTE}>{t('nav.Pricing')}</Link>
          </li>
          <li className="schedule">
            <Link to={SCHEDULE_ROUTE}>{t('nav.Schedule')}</Link>
          </li>
          <li className="team">
            <Link to={TEAM_ROUTE}>{t('nav.Team')}</Link>
          </li>
          <li className="club">
            <Link to={CLUB_ROUTE}>{t('nav.Club')}</Link>
          </li>
          <li className="faq">
            <Link to={FAQ_ROUTE}>{t('nav.Faq')}</Link>
          </li>
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
    </>
  )
}
