import React, { createContext, Suspense, lazy } from 'react'
import ReactDom from 'react-dom'
import './styles/normalize.css'
import './styles/common.scss'
import './i18n'
import { Spinner } from 'Spinner'
import { Provider } from 'react-redux'
import store from './store/root.store'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyBfmTEsaMI_rX_G0ZbgrIqUdQghinW2eKs',
  authDomain: 'fit-48bac.firebaseapp.com',
  projectId: 'fit-48bac',
  storageBucket: 'fit-48bac.appspot.com',
  messagingSenderId: '440877798570',
  appId: '1:440877798570:web:efe70e438944b894ce2cd3',
  measurementId: 'G-5227123YVS',
})

const firebaseAuth = firebase.auth()
const firestore = firebase.firestore()

interface FACProps {
  firebase?: any
  firebaseAuth: any
  firestore: any
  user: any
  login: () => void
}

export const FirebaseAuthContext = createContext({} as FACProps)

const AppRouter = lazy(() => import('./AppRouter'))

const App: React.FC = () => {
  const [user] = useAuthState(firebaseAuth)
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebaseAuth.signInWithPopup(provider)
  }
  return (
    <Suspense fallback={<Spinner />}>
      <FirebaseAuthContext.Provider
        value={{
          firebaseAuth: firebaseAuth,
          firestore: firestore,
          user: user,
          login: login,
        }}
      >
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </FirebaseAuthContext.Provider>
    </Suspense>
  )
}

//func for svg to load as sprites in index.html and use them in components -> <svg><use xlinkHref={arrow}></use></svg>
// const importAllSvg = (webpackContext: __WebpackModuleApi.RequireContext) => {
//   webpackContext.keys().forEach(webpackContext)
// }
// importAllSvg(require.context('./img/spriteSvg', false, /\.(svg)$/))

// if (process.env.NODE_ENV !== 'production') {
//   console.log(process.env.NODE_ENV, 'development ')
// }

ReactDom.render(<App />, document.getElementById('root'))
