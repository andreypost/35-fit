import React, { Suspense, lazy } from 'react'
import {
    Route,
    HashRouter,
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom'
// import { ConnectedRouter } from 'connected-react-router';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor, history } from 'app/store';

const Main = lazy(() => import('./pages/Main'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Training = lazy(() => import('./pages/Training'))

const Footer = lazy(() => import('./components/Footer'))
const Flower = lazy(() => import('./pages/Flower'))

const App = (): any => (
    // <Provider store={store}>
    // <PersistGate persistor={persistor} loading={<Loading />}>
    // <Router basename="/">
    <HashRouter basename="/">
        <Suspense fallback="Loading...">
            {/* <ConnectedRouter history={history}> */}
            <Switch>
                <Route exact path="/">
                    <Main />
                    {/* <Footer /> */}
                </Route>
                <Route path="/pricing">
                    <Pricing />
                    {/* <Footer /> */}
                </Route>
                <Route path="/training">
                    <Training />
                </Route>
                <Route path="/flower" component={Flower} />
            </Switch>
            <Footer />
            {/* </ConnectedRouter> */}
        </Suspense>
    </HashRouter>
    // </Router>
    // </PersistGate>
    // </Provider>
)

export default App
