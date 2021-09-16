import React, { useContext } from 'react'
import {
  HashRouter,
  // BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { FirebaseAuthContext } from './index'
import { privatRoutes, publicRoutes } from './routes'
import { MAIN_ROUTE } from 'utils/routes.constants'
import { Footer } from 'Footer'
import LoginModal from 'modals/LoginModal'
import { MenuModal } from 'modals/MenuModal'
// import { createBrowserHistory } from 'history'
// const history = createBrowserHistory()
// console.log(history.location.pathname)

const AppRouter: React.FC = () => {
  const { user } = useContext(FirebaseAuthContext)
  return (
    <HashRouter basename="/">
      {/* <BrowserRouter basename="/"> */}
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
      {/* <Footer /> */}
      <MenuModal />
      <LoginModal />
      {/* </BrowserRouter> */}
    </HashRouter>
  )
}

export default AppRouter
