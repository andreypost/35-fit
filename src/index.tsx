import React, { createContext } from 'react'
import ReactDom from 'react-dom'
import './styles/normalize.css'
import './styles/common.scss'
import App from './App'
import './i18n'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: "AIzaSyBfmTEsaMI_rX_G0ZbgrIqUdQghinW2eKs",
  authDomain: "fit-48bac.firebaseapp.com",
  projectId: "fit-48bac",
  storageBucket: "fit-48bac.appspot.com",
  messagingSenderId: "440877798570",
  appId: "1:440877798570:web:efe70e438944b894ce2cd3",
  measurementId: "G-5227123YVS"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

export const FirebaseAuthContext = createContext({ firebase: firebase, auth: auth, firestore: firestore })

const importAllSvg = (webpackContext: __WebpackModuleApi.RequireContext) => {
  webpackContext.keys().forEach(webpackContext)
}
importAllSvg(require.context('./img/spriteSvg', false, /\.(svg)$/))

if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV, 'development ')
}

ReactDom.render(
  <FirebaseAuthContext.Provider value={{ firebase, auth, firestore }}>
    <App />
  </FirebaseAuthContext.Provider>
  , document.getElementById('root'))
