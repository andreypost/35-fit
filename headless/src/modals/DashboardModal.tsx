import { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FirebaseAuthContext } from '../index'
import { AppContext } from './../AppRouter'
import { useAppDispatch, useAppSelector } from 'roothooks'
import { selectDashModalActive, unsetDashModal } from 'slices/modal.slice'
import { BaseDiv } from './MenuModal'
import { NavigationLinks } from 'components/NavigationLinks'
import { profileLinks } from 'constants/routes'
import { User } from 'components/User'
import { logoutUserWithAuthToken } from 'slices/databaseUser.slice'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    max-width: 360px;
    ul {
      padding: 20px;
      text-align: center;
      .current_user {
        font-size: 12px;
        font-weight: 400;
      }
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
      .logout {
        margin-top: 10px;
        padding-top: 20px;
        border-top: 1px solid #e8e8e8;

        .check_box_delete {
          margin-right: auto;
          margin-bottom: 8px;
          margin-left: auto;
          padding-right: unset;
          padding-left: unset;
          font-size: 12px;
          text-decoration: underline;
          color: #ff6376;
          user-select: none;
          transition: all 0.2s;
          input {
            width: 100%;
            height: 18px;
            opacity: 0;
            cursor: pointer;
            &:checked ~ .delete_checkmark::after {
              content: '';
              width: 8px;
              height: 8px;
              border-radius: 1px;
              background-color: #ca2538;
            }
          }
          .delete_checkmark {
            box-sizing: border-box;
            height: 14px;
            width: 14px;
            margin-right: 8px;
            border: 2px solid #737373;
            border-radius: 3px;
            transition: background-color 0.2s;
          }
          &:hover {
            color: #ca2538;
          }
        }
        .signout {
          font-size: 18px;
          transition: color 0.2s;
        }
        @media (hover: hover) {
          .signout:hover {
            cursor: pointer;
            color: #ff6376;
          }
        }
      }
    }
  }
`

export const DashboardModal = () => {
  const { user, firebaseAuth } = useContext(FirebaseAuthContext)
  const { currentUser } = useContext(AppContext)
  const { t } = useTranslation()
  const modalState = useAppSelector(selectDashModalActive)
  const dispatch = useAppDispatch()
  const [deleteAccount, setDeleteAccount] = useState(false)

  return (
    <Div
      className={modalState}
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(unsetDashModal())
      }
    >
      <nav className="shadow_radius">
        <ul className="b900">
          {/* {useMemo(
            () => (
              <User user={user} styleName="dashboard_modal" />
              ),
              [user]
              )} */}
          <p className="current_user text_overflow blue">
            {currentUser?.email}
          </p>
          <User styleName="dashboard_modal" />
          <NavigationLinks links={profileLinks} bold="b900" color="#59b894" />
          <li className="logout">
            {!user && (
              <label
                htmlFor="checkbox"
                className="flex_center grey_label check_box_delete"
              >
                <input
                  type="checkbox"
                  name="deleteAccount"
                  className="grey_button absolute"
                  onChange={(e) => setDeleteAccount(e.target.checked)}
                />
                <span className="delete_checkmark flex_center_center" />
                {t('nav.also_delete_my_account')}
              </label>
            )}
            <span
              className="signout grey"
              onClick={() => (
                user && firebaseAuth.signOut(),
                !user && dispatch(logoutUserWithAuthToken({ deleteAccount })),
                dispatch(unsetDashModal())
              )}
            >
              {t('nav.sign_out')}
            </span>
          </li>
        </ul>
      </nav>
    </Div>
  )
}
