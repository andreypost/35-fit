import React from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from 'utils/hooks'
import { selectModalActive, unsetModal } from './modal.slice'
import { messageSuccessModal, messageErrorModal } from './message.modal.slice'

const Div = styled.div`
  opacity         : 0;
  position        : fixed;
  z-index         : -99;
  left            : 0;
  top             : 0;
  width           : 100%;
  height          : 200%;
  overflow        : auto;
  background-color: rgba(0, 0, 0, 0.2);
  transition      : opacity .4s, z-index .1s .4s;

  &.loginActive {
    z-index   : 99;
    opacity   : 1;
    transition: z-index .1s, opacity .4s .1s;

    ul {
      transform: scale(1);
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column;
    min-height: 105px;
    margin-top: 30vh;
    padding: 20px 20px 10px;
    background: #fedeff;
    text-align: center;
    box-sizing   : border-box;
    width        : 90%;
    margin       : 15vh auto 0;
    padding      : 92px 48px 30px;
    border-radius: 30px;
    box-shadow   : 0px 16px 16px rgba(0, 0, 0, 0.25);
    background   : $light_peach_color;
    transform    : scale(0);
    transition   : transform .6s;
    
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
  }`

const Login: React.FC = () => {
  const dispatch = useAppDispatch(),
    modalState = useAppSelector(selectModalActive)
  return (
    <Div className={modalState} onClick={e => { if (e.target === e.currentTarget) dispatch(unsetModal()) }}>
      <p onClick={() => dispatch(messageSuccessModal())}>notificationSuccessModal</p>
      <h1 onClick={() => dispatch(messageErrorModal())}>notificationSuccessModal</h1>
    </Div>
  )
}
export default Login
