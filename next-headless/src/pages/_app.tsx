import React, {
  createContext,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from "react";
import { appWithTranslation } from "next-i18next";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  // createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "../globals.css";
import "../styles/normalize.css";
import "../styles/common.scss";
import "aos/dist/aos.css";
import { IFirebaseProps } from "types/interface";
import { Spinner } from "Spinner";
import { Provider } from "react-redux";
import { store } from "store";
import { ApolloAppProvider } from "src/ApolloAppProvider";
import { HeaderNavigate } from "components/HeaderNavigate";
import RootLayout from "src/RootLayout";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { setDatabaseUser, validateAuthToken } from "slices/databaseUser.slice";
import { Footer } from "components/Footer";
import { MenuModal } from "modals/MenuModal";
import { LoginModal } from "modals/LoginModal";
import { DashboardModal } from "modals/DashboardModal";
import { MessageModal } from "modals/MessageModal";

initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fit-35.firebaseapp.com",
  projectId: "fit-35",
  storageBucket: "fit-35.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const firebaseAuth = getAuth();
const firestore = getFirestore();

export const FirebaseAuthContext = createContext({} as IFirebaseProps);
// export const AppContext = createContext({} as IAppConfig);

const RootWrapper = ({ Component, pageProps }) => {
  const { user, login, firebaseAuth } = useContext(FirebaseAuthContext);
  const { databaseUser } = useAppSelector(setDatabaseUser);
  const [firebaseLoading, setFirebaseLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, () =>
      setFirebaseLoading(false)
    );
    return () => unsubscribe();
  }, []);

  const currentUser = user || databaseUser;

  useEffect(() => {
    if (!currentUser && !firebaseLoading) {
      dispatch(validateAuthToken({ firstLoad: true }));
    }
  }, [currentUser, firebaseLoading, dispatch]);

  return (
    <>
      {useMemo(
        () => (
          <HeaderNavigate user={currentUser} />
        ),
        [currentUser]
      )}
      <Component {...pageProps} />
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
    </>
  );
};

const RootApp = ({ Component, pageProps }) => {
  const [user] = useAuthState(firebaseAuth);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <RootLayout>
        <ApolloAppProvider>
          <FirebaseAuthContext.Provider
            value={{
              firebaseAuth,
              firestore,
              user,
              login,
            }}
          >
            {/* <AppContext.Provider value={{ language, setLanguage }}> */}
            <Provider store={store}>
              <React.StrictMode>
                <RootWrapper
                  Component={Component || (() => null)}
                  {...pageProps}
                />
              </React.StrictMode>
            </Provider>
            {/* </AppContext.Provider> */}
          </FirebaseAuthContext.Provider>
        </ApolloAppProvider>
      </RootLayout>
    </Suspense>
  );
};

export default appWithTranslation(RootApp);
