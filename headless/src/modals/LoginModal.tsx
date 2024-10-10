import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RESERVE_ROUTE } from 'utils/routes.constants'
import { useAppSelector, useAppDispatch } from 'utils/hooks'
import { BaseDiv } from './MenuModal'
import {
  messageModal,
  selectLoginModalActive,
  unsetLoginModal,
} from 'slices/modal.slice'
import { IFirebaseProps } from 'types/interface'
import { CrossRedSVG } from 'img/icons'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from 'queries'
import { loginUserFromDatabase } from 'slices/databaseUser.slice'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    text-align: center;
    .use_google,
    a {
      font-size: 14px;
    }
    a,
    .checkmark {
      height: 42px;
    }
    #loginForm {
      max-width: 330px;
      margin-left: auto;
      margin-right: auto;
      input[type='email'],
      input[type='password'] {
        margin-bottom: 20px;
        &::placeholder {
          font-weight: 400;
          color: #6e7071;
        }
      }
      .check_box {
        margin-bottom: unset;
        margin-left: unset;
        padding-left: unset;
        user-select: none;
        input {
          width: 100%;
          opacity: 0;
          @media (hover: hover) {
            cursor: pointer;
          }
        }
        .checkmark {
          box-sizing: border-box;
          width: 42px;
          margin-right: 15px;
          border: 2px solid #b2b2b2;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        &:hover input ~ .checkmark {
          background-color: #b2b2b2;
        }
        input:checked ~ .checkmark {
          background-color: white;
          &::after {
            content: '';
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background-color: #004;
          }
        }
      }
      button {
        margin-bottom: 30px;
        background: #b2b2b2;
        transition: color 0.2s;
        &:hover {
          color: white;
        }
      }
      .use_google {
        transition: color 0.2s;
        &:hover {
          color: #ff6376;
        }
        @media (hover: hover) {
          cursor: pointer;
        }
      }
    }
    .login_book {
      display: flex;
      justify-content: center;
      article {
        width: 100%;
        max-width: 330px;
        a {
          width: 100%;
          margin-top: 30px;
          border-radius: 26px;
          background: #000044;
          transition: color 0.2s;
          &:hover {
            color: #59b894;
          }
        }
      }
    }
    @media (max-width: 1023px) {
      flex-flow: column;
      #loginForm {
        padding: 40px 20px;
        h1,
        .check_box {
          margin-bottom: 30px;
        }
        h1 {
          font-size: 28px;
        }
      }
      .login_book {
        height: 476px;
        article {
          padding: 60px 20px;
          h2 {
            font-size: 20px;
          }
        }
      }
    }
    @media (min-width: 1024px) {
      max-width: 980px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      #loginForm {
        width: 100%;
        order: 2;
        padding-top: 60px;
        padding-bottom: 60px;
        h1,
        .check_box {
          margin-bottom: 40px;
        }
        h1 {
          font-size: 36px;
        }
      }
      .login_book {
        order: 1;
        article {
          margin-top: auto;
          padding-bottom: 70px;
        }
      }
    }
  }
`

export const LoginModal = ({ user, login }: IFirebaseProps) => {
  const dispatch = useAppDispatch(),
    modalState = useAppSelector(selectLoginModalActive),
    { t } = useTranslation(),
    [loginData, setLoginData] = useState({
      email: '',
      password: '9999',
    }),
    [checkState, setCheckState] = useState(false),
    [loginUser] = useMutation(LOGIN_USER, {
      context: { credentials: 'include' },
      onError: (error) => {
        const { extensions, message } = error.graphQLErrors[0]
        console.error(
          `Error: ${message}, status: ${extensions?.status}, type: ${extensions?.type}`
        )
      },
    }),
    location = useLocation()

  useEffect(() => {
    ;(user || location.pathname.includes('reserve')) &&
      dispatch(unsetLoginModal())
  }, [user, location])

  const handleChangeLoginData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  const handleLoginSubmit = async <T extends React.FormEvent<HTMLFormElement>>(
    e: T
  ): Promise<void> => {
    e.preventDefault()
    dispatch(loginUserFromDatabase(loginData))
    /* try {
      const response = await loginUser({
        variables: {
          email: 'test_08@email.com',
          password: '9999',
        },
      })
      console.log('/graphql loginUser:', response)
    } catch (error: any) {
      console.error(error?.response?.data)
    } */
    if (process.env.NODE_ENV === 'production') {
      dispatch(unsetLoginModal())
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            dispatch(messageModal(t('messages.sorry_but_it_is_not_possible')))
          )
        }, 1500)
      })
    }
  }
  return (
    <Div
      className={modalState}
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(unsetLoginModal())
      }
    >
      <nav className="shadow_radius">
        <CrossRedSVG
          className="cross_icon absolute"
          onClick={() => dispatch(unsetLoginModal())}
        />
        <form
          id="loginForm"
          className="flex_str_col"
          onSubmit={handleLoginSubmit}
        >
          <h1 className="b900 blue">
            {t('welcome_to')}
            <br />
            35 FIT
          </h1>
          <label htmlFor="login" className="grey_label">
            {t('email_address')}
          </label>
          <input
            type="email"
            name="email"
            className="grey_button blue"
            placeholder={t('enter_email_address')}
            onChange={handleChangeLoginData}
            required
          />
          <label htmlFor="password" className="grey_label">
            {t('password')}
          </label>
          <input
            type="password"
            name="password"
            className="grey_button part_radius blue"
            placeholder={t('enter_password')}
            onChange={handleChangeLoginData}
            // required
          />
          <label htmlFor="radio" className="flex_center grey_label check_box">
            <input
              type="radio"
              name="radio"
              className="grey_button absolute"
              checked={checkState}
              readOnly
              onClick={() => setCheckState(!checkState)}
            />
            <span className="checkmark flex_center_center" />
            {t('keep_me_logged_in')}
          </label>
          <button type="submit" className="grey_button grey">
            {t('nav.login')}
          </button>
          <p className="use_google b700 green" onClick={() => login()}>
            {t('use_google_account_sign_in')}
          </p>
        </form>
        <div className="login_book">
          <article>
            <h2 className="b900 white">{t('not_member_yet')}</h2>
            <Link className="flex_center_center b700 white" to={RESERVE_ROUTE}>
              {t('book_your_training')}
            </Link>
          </article>
        </div>
      </nav>
    </Div>
  )
}
