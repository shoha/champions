import type { FirebaseOptions } from "@firebase/app";
import firebase from "firebase/compat/app";
import { createContext, useContext, useState } from "react";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
const firebaseApp = firebase.initializeApp(
  firebaseConfig,
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_NAME
);

export const FirebaseAppContext = createContext(firebaseApp);

export const useFirebaseApp = () => {
  const firebaseApp = useContext(FirebaseAppContext);
  return firebaseApp;
};

export const FirebaseAppProvider = ({ children }) => {
  return (
    <FirebaseAppContext.Provider value={firebaseApp}>
      {children}
    </FirebaseAppContext.Provider>
  );
};
