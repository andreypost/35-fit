import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { BaseDiv } from './MenuModal'
import { selectMessageModalActive, selectMessageModalValue, unsetMessageModal } from './modal.slice'

const Div = styled(BaseDiv)`
  nav {
    
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
      onClick={e => e.target === e.currentTarget && dispatch(unsetMessageModal())}
    >
      <p>{messageValue}</p>
    </Div>
  )
}
