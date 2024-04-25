import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectDashModalActive, unsetDashModal } from '../utils/modal.slice'
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
        margin: 10px 0;
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
        margin-top: 10px;
        padding-top: 20px;
        border-top: 1px solid #e8e8e8;
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
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(unsetDashModal())
      }
    >
      <nav>
        <ul className="b900">
          {useMemo(
            () => (
              <User user={user} styleName="dashboard_modal" />
            ),
            [user]
          )}
          <NavigationLinks links={profileLinks} bold="b900" color="#59b894" />
          <li
            className="signout grey"
            onClick={() => (firebaseAuth.signOut(), dispatch(unsetDashModal()))}
          >
            {t('nav.sign_out')}
          </li>
        </ul>
      </nav>
    </Div>
  )
}
