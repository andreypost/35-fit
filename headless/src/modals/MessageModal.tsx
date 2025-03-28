import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { BaseDiv } from './MenuModal'
import {
  selectMessageModalActive,
  selectMessageModalValue,
  unsetMessageModal,
} from 'slices/modal.slice'
import { CrossRedSVG } from 'img/icons'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    display: block;
    padding: 80px 40px 40px;
    p {
      padding-bottom: 20px;
    }
    hr {
      border: unset;
      height: 2px;
      background-color: #59b894;
    }
  }
`

export const MessageModal = () => {
  const dispatch = useAppDispatch()
  const messageState = useAppSelector(selectMessageModalActive)
  const messageValue = useAppSelector(selectMessageModalValue)

  return (
    <Div
      className={messageState}
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(unsetMessageModal())
      }
    >
      <nav className="shadow_radius center relative">
        <CrossRedSVG
          className="cross_icon absolute"
          onClick={() => dispatch(unsetMessageModal())}
        />
        <p className="b700 grey">{messageValue}</p>
        <hr />
      </nav>
    </Div>
  )
}
