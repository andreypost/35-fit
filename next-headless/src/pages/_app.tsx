/*import React, {
  createContext,
  useState,
  useEffect,
  Suspense,
  useContext,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import "../globals.css";
import "aos/dist/aos.css";
import { IAppConfig, IFirebaseProps } from "types/interface";
import { Spinner } from "Spinner";
import { Provider } from "react-redux";
import store from "store";
import { ApolloAppProvider } from "src/ApolloAppProvider";
import { HeaderNavigate } from "components/HeaderNavigate";
import RootLayout from "src/RootLayout";
import { isBrowser } from "isBrowser";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { GetCurrentWindowScroll } from "hooks/scroll";
import { setDatabaseUser, validateAuthToken } from "slices/databaseUser.slice";
import { Footer } from "components/Footer";
import { MenuModal } from "modals/MenuModal";
import { LoginModal } from "modals/LoginModal";
import { DashboardModal } from "modals/DashboardModal";
import { MessageModal } from "modals/MessageModal";

initializeApp({
  // apiKey: "AIzaSyCTa3IM55ISUwQjFY2cCblix4X1IVM-OeY",
  // authDomain: "sobima-fb29d.firebaseapp.com",
  // projectId: "sobima-fb29d",
  // storageBucket: "sobima-fb29d.appspot.com",
  // messagingSenderId: "856275227807",
  // appId: "1:856275227807:web:653767d7c6e5d4e1363eaa",
  // measurementId: "G-DQ7VMC727X",
  apiKey: "AIzaSyBPesv7njcfFIF02eJ48ZlCNLZExe-2S7M",
  authDomain: "sobima-52422.firebaseapp.com",
  projectId: "sobima-52422",
  storageBucket: "sobima-52422.appspot.com",
  messagingSenderId: "421210112802",
  appId: "1:421210112802:web:d8898587e980e257c99b7b",
  measurementId: "G-X6GQMLPTMS",
});

const firebaseAuth = getAuth();
const firestore = getFirestore();

export const FirebaseAuthContext = createContext({} as IFirebaseProps);
export const AppContext = createContext({} as IAppConfig);

const App = ({ Component, pageProps }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    isBrowser() ? localStorage.getItem("i18nextLng") || "en" : "en"
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "i18nextLng" && e.newValue) {
        setLanguage(e.newValue);
        i18n.changeLanguage(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  });

  const [user] = useAuthState(firebaseAuth);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
  };
  const [firebaseLoading, setFirebaseLoading] = useState(true);
  const { databaseUser } = useAppSelector(setDatabaseUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, () => {
      setFirebaseLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const currentUser = user || databaseUser;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser && !firebaseLoading) {
      dispatch(validateAuthToken());
    }
  }, [currentUser, firebaseLoading, dispatch]);

  const [footerContent, setFooterContent] = useState(false);
  const winScroll = GetCurrentWindowScroll();

  useEffect(() => {
    winScroll > 80 && setFooterContent(true);
  }, [winScroll]);

  return (
    <Suspense fallback={<Spinner />}>
      <RootLayout>
        <ApolloAppProvider>
          <FirebaseAuthContext.Provider
            value={{
              firebaseAuth,
              firestore,
              user: currentUser,
              login,
            }}
          >
            <AppContext.Provider value={{ language, setLanguage }}>
              <Provider store={store}>
                <HeaderNavigate user={currentUser} />
                <Component {...pageProps} />
                {footerContent && <Footer />}
                <MenuModal user={currentUser} />
                <LoginModal user={currentUser} login={login} />
                <DashboardModal
                  user={currentUser}
                  login={login}
                  firebaseAuth={firebaseAuth}
                />
                <MessageModal />
              </Provider>
            </AppContext.Provider>
          </FirebaseAuthContext.Provider>
        </ApolloAppProvider>
      </RootLayout>
    </Suspense>
  );
};

export default App;

*/

import React, {
  createContext,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useTransition,
  useContext,
} from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  // createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "../i18n";
import { useTranslation } from "react-i18next";
import "../globals.css";
import "../styles/normalize.css";
import "../styles/common.scss";
import "aos/dist/aos.css";
import { IAppConfig, IFirebaseProps } from "types/interface";
import { Spinner } from "Spinner";
import { Provider } from "react-redux";
import store from "store";
import { ApolloAppProvider } from "src/ApolloAppProvider";
import { HeaderNavigate } from "components/HeaderNavigate";
import RootLayout from "src/RootLayout";
import { isBrowser } from "isBrowser";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { GetCurrentWindowScroll } from "hooks/scroll";
import { setDatabaseUser, validateAuthToken } from "slices/databaseUser.slice";
import { Footer } from "components/Footer";
import { MenuModal } from "modals/MenuModal";
import { LoginModal } from "modals/LoginModal";
import { DashboardModal } from "modals/DashboardModal";
import { MessageModal } from "modals/MessageModal";

initializeApp({
  // apiKey: "AIzaSyCTa3IM55ISUwQjFY2cCblix4X1IVM-OeY",
  // authDomain: "sobima-fb29d.firebaseapp.com",
  // projectId: "sobima-fb29d",
  // storageBucket: "sobima-fb29d.appspot.com",
  // messagingSenderId: "856275227807",
  // appId: "1:856275227807:web:653767d7c6e5d4e1363eaa",
  // measurementId: "G-DQ7VMC727X",
  apiKey: "AIzaSyBPesv7njcfFIF02eJ48ZlCNLZExe-2S7M",
  authDomain: "sobima-52422.firebaseapp.com",
  projectId: "sobima-52422",
  storageBucket: "sobima-52422.appspot.com",
  messagingSenderId: "421210112802",
  appId: "1:421210112802:web:d8898587e980e257c99b7b",
  measurementId: "G-X6GQMLPTMS",
});

const firebaseAuth = getAuth();
const firestore = getFirestore();

export const FirebaseAuthContext = createContext({} as IFirebaseProps);
export const AppContext = createContext({} as IAppConfig);

const AppRootLevel = ({ Component, pageProps }) => {
  const { user, login, firebaseAuth } = useContext(FirebaseAuthContext);
  const { databaseUser } = useAppSelector(setDatabaseUser);
  const [firebaseLoading, setFirebaseLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, () =>
      setFirebaseLoading(false)
    );
    return () => unsubscribe();
  });

  const currentUser = user || databaseUser;

  useEffect(() => {
    if (!currentUser && !firebaseLoading) {
      dispatch(validateAuthToken());
    }
  }, [currentUser, firebaseLoading, dispatch]);

  const [footerContent, setFooterContent] = useState(false);
  const winScroll = GetCurrentWindowScroll();

  useEffect(() => {
    winScroll > 80 && setFooterContent(true);
  }, [winScroll]);

  return (
    <>
      {useMemo(
        () => (
          <HeaderNavigate user={currentUser} />
        ),
        [currentUser]
      )}
      <Component {...pageProps} />;
      {useMemo(() => footerContent && <Footer />, [footerContent])}
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

const App = ({ Component, pageProps }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    isBrowser() ? localStorage.getItem("i18nextLng") || "en" : "en"
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "i18nextLng" && e.newValue) {
        setLanguage(e.newValue);
        i18n.changeLanguage(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  });

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
            <AppContext.Provider value={{ language, setLanguage }}>
              <Provider store={store}>
                <React.StrictMode>
                  <AppRootLevel
                    Component={Component || (() => null)}
                    {...pageProps}
                  />
                </React.StrictMode>
              </Provider>
            </AppContext.Provider>
          </FirebaseAuthContext.Provider>
        </ApolloAppProvider>
      </RootLayout>
    </Suspense>
  );
};

export default App;
