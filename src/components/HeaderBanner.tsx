import React, { useEffect } from 'react'
// import { Link } from "react-router-dom";
import { useAppDispatch } from 'utils/hooks'
import { unsetMessageModal, unsetModal } from 'modals/modal.slice'

interface Props {
  // children: [ReactElement, ReactElement]
  children: JSX.Element | JSX.Element[]
}
// const Banner = (props: { children: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined)[]; t: any; }): any => {
export const HeaderBanner: React.FC<Props> = ({ children }: Props) => {
  const dispatch = useAppDispatch()

  const unsetModalState = () => {
    dispatch(unsetModal())
    dispatch(unsetMessageModal())
  }
  const keyDownHandler = (e: { key: string }) => {
    if (e.key === 'Escape') unsetModalState()
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    document.addEventListener('keydown', (e) => keyDownHandler(e))
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      unsetModalState()
    }
  })
  return (
    <div className="section">
      {children[0]}
      {children[1]}
    </div>
  )
}
