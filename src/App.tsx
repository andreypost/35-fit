import React, { Suspense, lazy } from 'react'
import { HashRouter, BrowserRouter } from 'react-router-dom'

// import { ConnectedRouter } from 'connected-react-router';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor, history } from 'app/store';

const Nav = lazy(() => import('./components/Nav'))
const AppRouter = lazy(() => import('./AppRouter'))
const Footer = lazy(() => import('./components/Footer'))

const App = (): any => (
    <HashRouter>
        {/* <BrowserRouter basename="/"> */}
        <Suspense fallback>
            <Nav />
            <AppRouter />
            <Footer />
        </Suspense>
        {/* </BrowserRouter> */}
    </HashRouter>
)

export default App

// const App = (): any => (
//     // <Provider store={store}>
//     // <PersistGate persistor={persistor} loading={<Loading />}>
//     // <Router basename="/">
//     <HashRouter basename="/">
//         <Suspense fallback="Loading...">
//             {/* <ConnectedRouter history={history}> */}
//             <Switch>
//                 <Route exact path="/">
//                     <Main />
//                     {/* <Footer /> */}
//                 </Route>
//                 <Route path="/pricing">
//                     <Pricing />
//                     {/* <Footer /> */}
//                 </Route>
//                 <Route path="/training">
//                     <Training />
//                 </Route>
//                 <Route path="/flower" component={Flower} />
//             </Switch>
//             <Footer />
//             {/* </ConnectedRouter> */}
//         </Suspense>
//     </HashRouter>
//     // </Router>
//     // </PersistGate>
//     // </Provider>
// )

// export default App
