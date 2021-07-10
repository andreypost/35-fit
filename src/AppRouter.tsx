import React, { useContext } from 'react'
import {
    HashRouter,
    // BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
// import { createBrowserHistory } from 'history'
import { FirebaseAuthContext } from '.'
import { useAuthState } from 'react-firebase-hooks/auth'
import { privatRoutes, publicRoutes } from './routes'
import { MAIN_ROUTE } from 'utils/routes.constants'
// const history = createBrowserHistory()
// console.log(history.location.pathname)

const AppRouter: React.FC = (): any => {
    const { auth } = useContext(FirebaseAuthContext)
    const [user] = useAuthState(auth)
    return (
        <HashRouter basename='/'>
            {/* <BrowserRouter basename="/"> */}
            <Switch>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact={true} />
                )}
                {user ? privatRoutes.map(({ path, Component }) => <Route key={path} path={path} component={Component} exact={true} />) : null}
                <Redirect to={MAIN_ROUTE} />
            </Switch>
            {/* </BrowserRouter> */}
        </HashRouter>
    )
}

export default AppRouter
