import "../styles/globals.css";
import { useFirebaseApp } from "../hooks/useFirebaseApp";
import { CurrentCharacterProvider } from "../hooks/useCurrentCharacter";
import { FirebaseAppProvider } from "../hooks/useFirebaseApp";
import { CurrentUserProvider } from "../hooks/useCurrentUser";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  // Initialize the Firebase app immediately
  useFirebaseApp();

  return (
    <CurrentCharacterProvider>
      <FirebaseAppProvider>
        <CurrentUserProvider>
          <Toaster position="bottom-right"></Toaster>
          <Component {...pageProps} />
        </CurrentUserProvider>
      </FirebaseAppProvider>
    </CurrentCharacterProvider>
  );
}

export default MyApp;
