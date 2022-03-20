import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { RESERVE_ROUTE } from 'utils/routes.constants'
// import { FirebaseAuthContext } from '../index'
import { useAppSelector, useAppDispatch } from 'utils/hooks'
import { BaseDiv } from './MenuModal'
import { selectLoginModalActive, unsetLoginModal } from './modal.slice'
import { FBUProps } from 'types/interface'
import { CrossRedSVG } from 'img/icons'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    text-align: center;

    #loginForm {
      display: flex;
      flex-flow: column;

      h2 {
        font-weight: 900;
        color: #000044;
      }

      label {
        position: relative;
        width: fit-content;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: -2px;
        margin-left: 26px;
        padding-left: 8px;
        padding-right: 2px;
        background-color: white;
        color: #6E7071;
      }

      input {
        box-sizing: border-box;
        height: 42px;
        font-size: 14px;
        font-weight: 700;
        border: 2px solid #B2B2B2;
        border-radius: 26px;
        color: #004;
        background: transparent;
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
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        
        input {
          position: absolute;
          opacity: 0;
        }
        
        .checkmark {
          box-sizing: border-box;
          width: 42px;
          height: 42px;
          margin-right: 15px;
          border: 2px solid #B2B2B2;
          border-radius: 50%;
          transition: background-color .2s;
        }
        
        &:hover input ~ .checkmark {
          background-color: #B2B2B2;
        }
        
        input:checked ~ .checkmark {
          background-color: #004;
        }

        @media (hover: hover) {
          cursor: pointer;
        }
      }

      button {
        height: 42px;
        font-size: 14px;
        font-weight: 700;
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
        font-size: 14px;
        font-weight: 700;
        color: #59B894;
        @media (hover: hover) {
          cursor: pointer;
        }
      }

    }

    .login_book {
      display: flex;
      flex-flow: column;

      h3 {
        font-weight: 900;
        margin-bottom: 30px;
        color: white;
      }

      a {
        height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        border-radius: 32px;
        background: #000044;
        color: white;
        transition: color .2s;
        &:hover {
          color: #ff6376;
        }
      }
    }

    @media (max-width: 992px) {
      flex-flow: column;
      #loginForm {
        padding: 40px;

        h2 {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .check_box {
          margin-bottom: 30px;
        }
      }
      .login_book {
        height: 476px;
        order: 1;
        padding: 60px 45px;
        h3 {
          font-size: 20px;
          
        }
      }
    }

    @media (min-width: 993px) {
      max-width: 980px;
      display: grid;
      grid-template-columns: 1fr 1fr;

      #loginForm {
        order: 2;
        padding: 60px 80px;

        h2 {
          font-size: 36px;
          margin-bottom: 40px;
        }
        
        .check_box {
          margin-bottom: 40px;
        }
      }
      .login_book {
        order: 1;
        padding: 73px;
        h3 {
          font-size: 24px;
          margin-top: auto;
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
  return (
    <Div
      // className={modalState}
      className={'loginActive'}
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
          <h3>{t('not_member_yet')}</h3>
          <Link to={RESERVE_ROUTE}>{t('book_your_training')}</Link>
        </div>
      </nav>
    </Div>
  )
}
