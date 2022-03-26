import { useEffect, useState } from 'react'
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

    .use_google, a {
      font-size: 14px;
      font-weight: 700;
    }
    
    a, .checkmark {
      height: 42px;
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

      input[type="email"], input[type="password"] {
        margin-bottom: 20px;
        &::placeholder {
          font-weight: 400;
          color: #6E7071;
        }
      }

      .check_box {
        display: flex;
        align-items: center;
        margin-bottom: unset;
        margin-left: unset;
        padding-left: unset;
        user-select: none;
        
        input {
          width: 100%;
          position: absolute;
          opacity: 0;
          @media (hover: hover) {
            cursor: pointer;
          }
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
      }

      button {
        margin-bottom: 30px;
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
          border-radius: 26px;
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
    { t } = useTranslation(),
    [checkState, setCheckState] = useState(false)
    // console.log('LoginModal: ', checkState)
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
          <label htmlFor="login" className='grey_label'>{t('email_address')}</label>
          <input type="email" name="login" className='grey_input' placeholder={t('enter_email_address')} required />
          <label htmlFor="password" className='grey_label'>{t('password')}</label>
          <input type="password" name="password" className='grey_input part_radius' placeholder={t('enter_password')} required />
          <label htmlFor="radio" className="grey_label check_box">
            <input type="radio" name="radio" className='grey_input'
              checked={checkState}
              readOnly
              onClick={() => setCheckState(!checkState)}
            />
            <span className="checkmark" />
            {t('keep_me_logged_in')}
          </label>
          <button type="submit" className='grey_input'>{t('nav.Login')}</button>
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
