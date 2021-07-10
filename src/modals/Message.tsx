import React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { selectModalActive, selectModalValue, unsetModal } from './modal.slice'

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

  &.messageActive {
    z-index   : 99;
    opacity   : 1;
    transition: z-index .1s, opacity .4s .1s;

    ul {
      transform: scale(1);
    }
  }
  `

const Message: React.FC = () => {
  const dispatch = useAppDispatch()
  const modalState = useAppSelector(selectModalActive)
  const value = useAppSelector(selectModalValue)

  return (
    <Div className={modalState} onClick={e => { if (e.target === e.currentTarget) dispatch(unsetModal()) }}>
      <p>{value}</p>
    </Div>
  )
}
export default Message
