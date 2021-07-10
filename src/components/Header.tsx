import React from 'react'
// import { Link } from "react-router-dom";
import Navigate from 'components/Navigate'
import Login from 'modals/Login'
import Menu from 'modals/Menu'
import Message from 'modals/Message'

interface Props {
  // children: [ReactElement, ReactElement]
  children: JSX.Element | JSX.Element[]
}
// const Header = (props: { children: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined)[]; t: any; }): any => {
const Header: React.FC<Props> = ({ children }: Props) => {
  return (
    <header className="section">
      <Navigate />
      <div>
        {children[0]}
        {children[1]}
      </div>
      <Menu />
      <Login />
      <Message />
    </header>
  )
}

export default Header