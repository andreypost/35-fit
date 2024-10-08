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
import {
  GetCurrentWindowScroll,
  useAppDispatch,
  useAppSelector,
} from 'utils/hooks'
import { setDatabaseUser, validateAuthToken } from 'slices/databaseUser.slice'
// import { createBrowserHistory } from 'history'
// const history = createBrowserHistory()
// console.log(history.location.pathname)

export const AppContext = createContext({} as IAppConfig)

const AppRouter = () => {
  const {
      user: firebaseUser,
      login,
      firebaseAuth,
    } = useContext(FirebaseAuthContext),
    { i18n } = useTranslation(),
    [language, setLanguage] = useState(
      localStorage.getItem('i18nextLng') || 'en'
    ),
    winScroll = GetCurrentWindowScroll(),
    [footerContent, setFooterContent] = useState(false),
    { databaseUser } = useAppSelector(setDatabaseUser),
    [firebaseLoading, setFirebaseLoading] = useState(true),
    dispatch = useAppDispatch()

  useEffect(() => {
    window.onstorage = (e: StorageEvent) => {
      if (e.key === 'i18nextLng' && e.newValue) {
        setLanguage(e.newValue)
        i18n.changeLanguage(e.newValue)
      }
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, () =>
      setFirebaseLoading(false)
    )
    return () => unsubscribe()
  }, [])

  const user = firebaseUser || databaseUser

  useDebugValue(user)

  useEffect(() => {
    if (!user && !firebaseLoading) {
      dispatch(validateAuthToken())
    }
  }, [user, firebaseLoading, dispatch])

  useEffect(() => {
    winScroll > 80 && setFooterContent(true)
  }, [winScroll])

  return (
    <AppContext.Provider value={{ language, setLanguage }}>
      <HashRouter basename="/">
        {/* <BrowserRouter basename="/"> */}
        {useMemo(
          () => (
            <HeaderNavigate user={user} />
          ),
          [user]
        )}
        <Switch>
          {publicRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              exact={true}
              // component={Component}
            >
              <Component user={user} />
            </Route>
          ))}
          {user &&
            privatRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} exact={true}>
                <Component user={user} />
              </Route>
            ))}
          <Redirect to={MAIN_ROUTE} />
        </Switch>
        {useMemo(() => footerContent && <Footer />, [footerContent])}
        {useMemo(
          () => (
            <MenuModal user={user} />
          ),
          [user]
        )}
        {useMemo(
          () => (
            <LoginModal user={user} login={login} />
          ),
          [user]
        )}
        {useMemo(
          () => (
            <DashboardModal
              user={user}
              login={login}
              firebaseAuth={firebaseAuth}
            />
          ),
          [user]
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
