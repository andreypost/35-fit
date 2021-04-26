import React from "react";
import ReactDom from 'react-dom'
import './styles/normalize.css'
import './styles/common.scss'
import { App } from './App'
const importAllSvg = (webpackContext: __WebpackModuleApi.RequireContext) => {
  webpackContext.keys().forEach(webpackContext)
}
importAllSvg(require.context('./img/spriteSvg', false, /\.(svg)$/))

ReactDom.render(<App />, document.getElementById('root'))
