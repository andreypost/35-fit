import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useDebugValue,
} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {
  HashRouter,
  // BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { FirebaseAuthContext } from './index'
import { useTranslation } from 'react-i18next'
import { privatRoutes, publicRoutes } from './routes'
import { MAIN_ROUTE } from 'utils/routes.constants'
import { HeaderNavigate } from 'components/HeaderNavigate'
import { Footer } from 'components/Footer'
import { MenuModal } from 'modals/MenuModal'
import { LoginModal } from 'modals/LoginModal'
import { MessageModal } from 'modals/MessageModal'
import { DashboardModal } from 'modals/DashboardModal'
import { IAppConfig } from 'types/interface'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { setDatabaseUser, validateAuthToken } from 'slices/databaseUser.slice'
// import { createBrowserHistory } from 'history'
// const history = createBrowserHistory()
// console.log(history.location.pathname)

export const AppContext = createContext({} as IAppConfig)

const AppRouter = () => {
  const { user, login, firebaseAuth } = useContext(FirebaseAuthContext),
    { i18n } = useTranslation(),
    [language, setLanguage] = useState(
      localStorage.getItem('i18nextLng') || 'en'
    ),
    { databaseUser } = useAppSelector(setDatabaseUser),
    [firebaseLoading, setFirebaseLoading] = useState(true),
    dispatch = useAppDispatch()

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'i18nextLng' && e.newValue) {
        setLanguage(e.newValue)
        i18n.changeLanguage(e.newValue)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, () =>
      setFirebaseLoading(false)
    )
    return () => unsubscribe()
  }, [])

  const currentUser = user || databaseUser

  useDebugValue(currentUser)

  useEffect(() => {
    if (!currentUser && !firebaseLoading) {
      dispatch(validateAuthToken({ firstLoad: true }))
    }
  }, [currentUser, firebaseLoading, dispatch])

  return (
    <AppContext.Provider value={{ language, setLanguage }}>
      <HashRouter basename="/">
        {/* <BrowserRouter basename="/"> */}
        {useMemo(
          () => (
            <HeaderNavigate user={currentUser} />
          ),
          [currentUser]
        )}
        <Switch>
          {publicRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              exact={true}
              // component={Component}
            >
              <Component user={currentUser} />
            </Route>
          ))}
          {currentUser &&
            privatRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} exact={true}>
                <Component user={currentUser} />
              </Route>
            ))}
          <Redirect to={MAIN_ROUTE} />
        </Switch>
        {useMemo(
          () => (
            <Footer />
          ),
          []
        )}
        {useMemo(
          () => (
            <MenuModal user={currentUser} />
          ),
          [currentUser]
        )}
        {useMemo(
          () => (
            <LoginModal user={currentUser} login={login} />
          ),
          [currentUser]
        )}
        {useMemo(
          () => (
            <DashboardModal
              user={currentUser}
              login={login}
              firebaseAuth={firebaseAuth}
            />
          ),
          [currentUser]
        )}
        {useMemo(
          () => (
            <MessageModal />
          ),
          []
        )}
        {/* </BrowserRouter> */}
      </HashRouter>
    </AppContext.Provider>
  )
}

export default AppRouter
