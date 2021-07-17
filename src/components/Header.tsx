import React from 'react'
// import { Link } from "react-router-dom";
import Navigate from 'components/Navigate'

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
    </header>
  )
}

export default Header