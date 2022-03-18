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
   ul {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      // flex-flow: column;
      padding: 40px;
      text-align: center;

      li {
        a {
          font-size: 18px;
          line-height: 48px;
          font-weight: 900;
        }

        .signout {
        }
        .login {
        }
      }
  }
`

export const DashboardModal = ({ user, login, firebaseAuth }: FBUProps) => {
  const { t } = useTranslation(),
    modalState = useAppSelector(selectDashModalActive),
    dispatch = useAppDispatch()

  // console.log('DashboardModal: ')

  return (
    <Div
      className={modalState}
      onClick={e => e.target === e.currentTarget && dispatch(unsetDashModal())}
    >
      <nav>
        <CrossRedSVG className="cross_icon" onClick={() => dispatch(unsetDashModal())} />
        <ul>
          {useMemo(() => <User user={user} styles='dashboard' />, [user])}
          <NavigationLinks links={profileLinks} color='#59b894' />
          <li onClick={() => (firebaseAuth.signOut(), dispatch(unsetDashModal()))}>
            {t('nav.Sign out')}
          </li>
        </ul>
      </nav>
    </Div>
  )
}
