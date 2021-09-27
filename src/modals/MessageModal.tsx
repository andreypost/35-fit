import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import {
  selectMessageModalActive,
  selectMessageModalValue,
  unsetMessageModal,
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

  &.messageActive {
    z-index: 99;
    opacity: 1;
    transition: z-index 0.1s, opacity 0.4s 0.1s;

    ul {
      transform: scale(1);
    }
  }
`

export const MessageModal = () => {
  const dispatch = useAppDispatch(),
    messageState = useAppSelector(selectMessageModalActive),
    messageValue = useAppSelector(selectMessageModalValue)
  // console.log('MessageModal: ')
  return (
    <Div
      className={messageState}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(unsetMessageModal())
      }}
    >
      <p>{messageValue}</p>
    </Div>
  )
}
