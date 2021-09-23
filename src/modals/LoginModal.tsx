import React from 'react'
import styled from 'styled-components'
// import { FirebaseAuthContext } from '../index'
import { useAppSelector, useAppDispatch } from 'utils/hooks'
import {
  selectLoginModalActive,
  unsetLoginModal,
  unsetMenuModal,
  messageSuccessModal,
} from './modal.slice'

const Div = styled.div`
  opacity: 0;
  position: fixed;
  z-index: -99;
  left: 0;
  top: 0;
  width: 100%;
  height: 200%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s, z-index 0.1s 0.4s;

  @media (orientation: landscape) {
    height: 100%;
  }

  &.loginActive {
    z-index: 99;
    opacity: 1;
    transition: z-index 0.1s, opacity 0.4s 0.1s;

    ul {
      transform: scale(1);
    }
  }

  ul {
    transform: scale(0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column;
    min-height: 105px;
    margin-top: 30vh;
    padding: 20px 20px 10px;
    background: #fedeff;
    text-align: center;
    box-sizing: border-box;
    width: 90%;
    margin: 15vh auto;
    padding: 92px 48px 30px;
    border-radius: 30px;
    box-shadow: 0px 16px 16px rgba(0, 0, 0, 0.25);
    background: $light_peach_color;
    transition: transform 0.6s;

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
`
interface Props {
  user: any
  login: () => void
}

export const LoginModal: React.FC<Props> = ({ user, login }: Props) => {
  // const { user, login } = useContext(FirebaseAuthContext),
  const dispatch = useAppDispatch(),
    modalState = useAppSelector(selectLoginModalActive)
  // console.log('LoginModal: ')
  return (
    <Div
      className={modalState}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(unsetLoginModal())
      }}
    >
      <p onClick={() => dispatch(messageSuccessModal())}>
        notificationSuccessModal
      </p>
      <h1 onClick={() => login()}>notificationSuccessModal</h1>
    </Div>
  )
}
