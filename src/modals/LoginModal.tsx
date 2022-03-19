import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { RESERVE_ROUTE } from 'utils/routes.constants'
// import { FirebaseAuthContext } from '../index'
import { useAppSelector, useAppDispatch } from 'utils/hooks'
import { BaseDiv } from './MenuModal'
import {
  selectLoginModalActive,
  unsetLoginModal,
  // unsetMenuModal,
  messageSuccessModal,
} from './modal.slice'
import { FBUProps } from 'types/interface'
import { CrossRedSVG } from 'img/icons'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    text-align: center;

    .login_welcome {

      #loginForm {
        display: flex;
        flex-flow: column;
      }
    }

    .login_book {
      display: flex;
      flex-flow: column;
      height: 100%;
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
      .login_welcome {
        padding: 30px 30px 38px;
      }
      .login_book {
        order: 1;
        padding: 60px 45px;
        h3 {
          font-size: 24px;
          
        }
      }
    }

    @media (min-width: 993px) {
      max-width: 1200px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .login_welcome {
        order: 2;
        padding: 80px 140px 92px;
      }
      .login_book {
        order: 1;
        padding: 73px;
        h3 {
          font-size: 36px;
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
      className={modalState}
      // className={'loginActive'}
      onClick={e => e.target === e.currentTarget && dispatch(unsetLoginModal())}
    >
      {/* <p onClick={() => dispatch(messageSuccessModal())}>
        notificationSuccessModal
      </p> */}
      {/* <button onClick={() => login()}>notificationSuccessModal</button> */}
      <nav>

        <div className='login_welcome'>
          <h2>{t('welcome_to_35')}</h2>
          <form action="" id="loginForm">
            <input type="email" name="login" id="" />
            <input type="password" name="password" id="" />
            <input type="checkbox" name="" id="" />
            <button type="submit">{t('nav.Login')}</button>
          </form>
          <p onClick={() => login()}>{t('use_google_account_sign_in')}</p>
        </div>
        <div className='login_book'>
          <h3>{t('not_member_yet')}</h3>
          <Link to={RESERVE_ROUTE}>{t('book_your_training')}</Link>
        </div>
      </nav>
    </Div>
  )
}
