import React, { ReactElement } from 'react'
// import { Link } from "react-router-dom";
// import("../styles/header.scss");
// import Nav from './Nav'
interface Props {
  children: [ReactElement, ReactElement]
}
// const Header = (props: { children: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined)[]; t: any; }): any => {
const Header: React.FC<Props> = ({ children }: Props): any => {
  // console.log(children)
  return (
    <header>
      {/* <Nav /> */}
      <div className="section">
        {children[0]}
        {children[1]}
      </div>
    </header>
  )
}

export default Header
