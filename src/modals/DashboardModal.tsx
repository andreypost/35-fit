import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectDashModalActive, unsetDashModal } from './modal.slice'
import { CrossRedSVG } from 'img/icons'
import { BaseDiv } from './MenuModal'
import { NavigationLinks } from 'components/NavigationLinks'
import { profileLinks } from 'utils/routes.constants'
import { FBUProps } from 'types/interface'
import { User } from 'components/User'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    max-width: 360px;
    ul {
      padding: 20px;
      text-align: center;
      a {
        display: inline-block;
        font-size: 18px;
        font-weight: 900;
        margin: 10px 0;
        color: #59b894;
        transition: color 0.2s;
        @media (hover: hover) {
          cursor: pointer;
          &:hover {
            color: #000044 !important;
          }
        }
      }
      .signout {
        font-size: 18px;
        font-weight: 900;
        margin-top: 10px;
        padding-top: 20px;
        border-top: 1px solid #e8e8e8;
        color: #737373;
        transition: color 0.2s;
        @media (hover: hover) {
          cursor: pointer;
          &:hover {
            color: #ff6376;
          }
        }
      }
    }
  }
`

export const DashboardModal = ({ user, login, firebaseAuth }: FBUProps) => {
  const { t } = useTranslation(),
    modalState = useAppSelector(selectDashModalActive),
    dispatch = useAppDispatch()

  return (
    <Div
      className={modalState}
      onClick={e => e.target === e.currentTarget && dispatch(unsetDashModal())}
    >
      <nav>
        <ul>
          {useMemo(() => <User user={user} styles='dashboard_modal' />, [user])}
          <NavigationLinks links={profileLinks} color='#59b894' />
          <li className='signout' onClick={() => (firebaseAuth.signOut(), dispatch(unsetDashModal()))}>
            {t('nav.Sign out')}
          </li>
        </ul>
      </nav>
    </Div>
  )
}
