import React, {
  createContext,
  useState,
  useEffect,
  Suspense,
  lazy,
  useMemo,
} from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
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
import { useAppSelector } from "hooks/redux";
import { GetCurrentWindowScroll } from "hooks/scroll";
import { setDatabaseUser } from "slices/databaseUser.slice";
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
  const [user] = useAuthState(firebaseAuth);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
  };
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    isBrowser() ? localStorage.getItem("i18nextLng") || "en" : "en"
  );
  const winScroll = GetCurrentWindowScroll();
  const [footerContent, setFooterContent] = useState(false);
  // const { databaseUser } = useAppSelector(setDatabaseUser);

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

  useEffect(() => {
    winScroll > 80 && setFooterContent(true);
  }, [winScroll]);

  return (
    <RootLayout>
      <Suspense fallback={<Spinner />}>
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
                  {useMemo(
                    () => (
                      <HeaderNavigate user={user} />
                    ),
                    [user]
                  )}
                  <Component {...pageProps} />
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
                </React.StrictMode>
              </Provider>
            </AppContext.Provider>
          </FirebaseAuthContext.Provider>
        </ApolloAppProvider>
      </Suspense>
    </RootLayout>
  );
};

export default App;
