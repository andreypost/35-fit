import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { RESERVE_ROUTE } from 'utils/routes.constants'
import { useAppSelector, useAppDispatch } from 'utils/hooks'
import { BaseDiv } from './MenuModal'
import { selectLoginModalActive, unsetLoginModal } from './modal.slice'
import { FBUProps } from 'types/interface'
import { CrossRedSVG } from 'img/icons'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    text-align: center;

    label, input, button, .use_google, a {
      font-size: 14px;
      font-weight: 700;
      &:not(label, .use_google), .checkmark {
        height: 42px;
      }
    }

    #loginForm {
      max-width: 330px;
      display: flex;
      flex-flow: column;
      margin-left: auto;
      margin-right: auto;

      h2 {
        font-weight: 900;
        color: #000044;
      }

      label {
        position: relative;
        width: fit-content;
        margin-bottom: -2px;
        margin-left: 26px;
        padding-left: 8px;
        padding-right: 2px;
        background-color: white;
        color: #6E7071;
      }

      input {
        box-sizing: border-box;
        border: 2px solid #B2B2B2;
        border-radius: 26px;
        color: #004;
      }

      input[type="email"], input[type="password"] {
        margin-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        &::placeholder {
          font-weight: 400;
        }
      }

      input[type="password"] {
        width: 95%;
        border-radius: 26px 0 0 26px;
        border-top: none;
        border-right: none;
      }

      .check_box {
        display: flex;
        align-items: center;
        margin-bottom: unset;
        margin-left: unset;
        padding-left: unset;
        user-select: none;
        
        input {
          position: absolute;
          opacity: 0;
        }
        
        .checkmark {
          box-sizing: border-box;
          width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          border: 2px solid #B2B2B2;
          border-radius: 50%;
          transition: background-color .2s;
        }
        
        &:hover input ~ .checkmark {
          background-color: #B2B2B2;
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

        @media (hover: hover) {
          cursor: pointer;
        }
      }

      button {
        margin-bottom: 30px;
        border-radius: 21px;
        color: #737373;
        background: #B2B2B2;
        transition: color .2s;
        &:hover {
          color: white;
        }
      }

      .use_google {
        color: #59B894;
        transition: color .2s;
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
        h3 {
          font-weight: 900;
          margin-bottom: 30px;
          color: white;
        }
        
        a {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 32px;
          background: #000044;
          color: white;
          transition: color .2s;
          &:hover {
            color: #59B894;
          }
        }
      }
    }

    @media (max-width: 992px) {
      flex-flow: column;
      #loginForm {
        padding: 40px 20px;

        h2, .check_box {
          margin-bottom: 30px;
        }

        h2 {
          font-size: 28px;
        }
      }

      .login_book {
        height: 476px;

        article {
          padding: 60px 20px;
          h3 {
            font-size: 20px;
          }
        }
      }
    }

    @media (min-width: 993px) {
      max-width: 980px;
      display: grid;
      grid-template-columns: 1fr 1fr;

      #loginForm {
        width: 100%;
        order: 2;
        padding-top: 60px;
        padding-bottom: 60px;

        h2, .check_box {
          margin-bottom: 40px;
        }
        
        h2 {
          font-size: 36px;
        }
      }

      .login_book {
        order: 1;
        
        article {
          margin-top: auto;
          padding-bottom: 70px;

          h3 {
            font-size: 24px;
          }
        }
      }
    }
  }
`
export const LoginModal = ({ user, login }: FBUProps) => {
  const dispatch = useAppDispatch(),
    modalState = useAppSelector(selectLoginModalActive),
    { t } = useTranslation()
  // console.log('LoginModal: ')
  useEffect(() => {
    user && dispatch(unsetLoginModal())
  }, [user])
  return (
    <Div
      className={modalState}
      onClick={e => e.target === e.currentTarget && dispatch(unsetLoginModal())}
    >
      <nav>
        <CrossRedSVG className="cross_icon" onClick={() => dispatch(unsetLoginModal())} />
        <form action="" id="loginForm">
          <h2>{t('welcome_to')}<br />35 FIT</h2>
          <label htmlFor="login">{t('email_address')}</label>
          <input type="email" name="login" placeholder={t('enter_email_address')} required />
          <label htmlFor="password">{t('password')}</label>
          <input type="password" name="password" placeholder={t('enter_password')} required />
          <label className="check_box">
            <input type="radio" name="radio" defaultChecked={undefined} />
            <span className="checkmark"></span>
            {t('keep_me_logged_in')}
          </label>
          <button type="submit">{t('nav.Login')}</button>
          <p className="use_google" onClick={() => login()}>{t('use_google_account_sign_in')}</p>
        </form>
        <div className='login_book'>
          <article>
            <h3>{t('not_member_yet')}</h3>
            <Link to={RESERVE_ROUTE}>{t('book_your_training')}</Link>
          </article>
        </div>
      </nav>
    </Div>
  )
}
