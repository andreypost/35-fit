import styled from 'styled-components'
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

const Div = styled(BaseDiv)`
  nav {
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: column;
      padding: 40px;
      text-align: center;

      li {
        a {
        }

        font-size: 18px;
        line-height: 21px;
        margin-bottom: 10px;

        .signout {
        }
        .login {
        }
      }
    }
  }
`
export const LoginModal = ({ user, login }: FBUProps) => {
  const dispatch = useAppDispatch(),
    modalState = useAppSelector(selectLoginModalActive)
  // console.log('LoginModal: ')
  return (
    <Div
      className={modalState}
      onClick={e => e.target === e.currentTarget && dispatch(unsetLoginModal())}
    >
      <p onClick={() => dispatch(messageSuccessModal())}>
        notificationSuccessModal
      </p>
      <button onClick={() => login()}>notificationSuccessModal</button>
    </Div>
  )
}
