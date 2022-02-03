import { createContext, useContext, useEffect, useMemo, useState } from 'react'
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
import { ACProps } from 'types/appTypes'
// import { createBrowserHistory } from 'history'
// const history = createBrowserHistory()
// console.log(history.location.pathname)

export const AppContext = createContext({} as ACProps)

const AppRouter = () => {
  const { user, login, firebaseAuth } = useContext(FirebaseAuthContext),
    { i18n } = useTranslation(),
    [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    window.onstorage = (e: StorageEvent) => {
      if (e.key === 'i18nextLng' && e.newValue) {
        setLanguage(e.newValue)
        i18n.changeLanguage(e.newValue)
      }
    }
  }, [])
  return (
    <AppContext.Provider
      value={{ language, setLanguage }}
    >
      <HashRouter basename="/">
        {/* <BrowserRouter basename="/"> */}
        {useMemo(
          () => (
            <HeaderNavigate user={user} />
          ),
          [user],
        )}
        <Switch>
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} exact={true} />
          ))}
          {user
            ? privatRoutes.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  component={Component}
                  exact={true}
                />
              ))
            : null}
          <Redirect to={MAIN_ROUTE} />
        </Switch>
        {useMemo(
          () => (
            <Footer />
          ),
          [],
        )}
        {useMemo(
          () => (
            <MenuModal user={user} />
          ),
          [user],
        )}
        {useMemo(
          () => (
            <LoginModal user={user} login={login} />
          ),
          [user],
        )}
        {useMemo(
          () => (
            <MessageModal />
          ),
          [],
        )}
        {useMemo(
          () => (
            <DashboardModal
              user={user}
              login={login}
              firebaseAuth={firebaseAuth}
            />
          ),
          [user],
        )}
        {/* </BrowserRouter> */}
      </HashRouter>
    </AppContext.Provider>
  )
}

export default AppRouter
