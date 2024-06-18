import React, { createContext, useEffect, Suspense, lazy } from 'react'
import ReactDom from 'react-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Provider } from 'react-redux'
import store from './store/root.store'
import './styles/normalize.css'
import './styles/common.scss'
import './i18n'
import { Spinner } from 'Spinner'
import { IFirebaseProps } from 'types/interface'

initializeApp({
  apiKey: 'AIzaSyAyT0D2bg_Jo3byFrOZ2_kIhpzTi3BBolU',
  // apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'fit-35.firebaseapp.com',
  projectId: 'fit-35',
  storageBucket: 'fit-35.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
})

const firebaseAuth = getAuth()
const firestore = getFirestore()

export const FirebaseAuthContext = createContext({} as IFirebaseProps)

const AppRouter = lazy(() => import('./AppRouter'))

const App = () => {
  const [user] = useAuthState(firebaseAuth)
  const login = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(firebaseAuth, provider)
  }

  useEffect(() => {
    console.log(process.env, process.env.FIREBASE_API_KEY)
    AOS.init({
      duration: 2000,
      // once: true,
    })
  }, [])

  return (
    <Suspense fallback={<Spinner />}>
      <FirebaseAuthContext.Provider
        value={{
          firebaseAuth,
          firestore,
          user,
          login,
        }}
      >
        <Provider store={store}>
          <React.StrictMode>
            <AppRouter />
          </React.StrictMode>
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
