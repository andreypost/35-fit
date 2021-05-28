import React from 'react'
// import { Link } from "react-router-dom";
// import("../styles/header.scss");
// import Nav from './Nav'

// const Header = (props: { children: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined)[]; t: any; }): any => {
const Header = (props: { children: React.ReactElement }): any => {
  // console.log(props.children)
  return (
    <header>
      {/* <Nav /> */}
      <div className="section">
        {props.children[0]}
        {props.children[1]}
      </div>
    </header>
  )
}

export default Header
