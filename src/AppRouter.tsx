import React, { useContext, Suspense } from 'react'
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import { FirebaseAuthContext } from '.'
import { useAuthState } from 'react-firebase-hooks/auth'
import { privatRoutes, publicRoutes } from './routes'
import { MAIN_ROUTE } from './utils/consts'
import Loader from './components/Loader'

const AppRouter = (): any => {
    const { auth } = useContext(FirebaseAuthContext)
    const [user] = useAuthState(auth)
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact={true} />
                )}
                {user ? privatRoutes.map(({ path, Component }) => <Route key={path} path={path} component={Component} exact={true} />) : null}
                <Redirect to={MAIN_ROUTE} />
            </Switch>
        </Suspense>
    )
}

export default AppRouter
