import "../styles/globals.css";
import { useFirebaseApp } from "../hooks/useFirebaseApp";
import { CurrentCharacterProvider } from "../hooks/useCurrentCharacter";
import { CurrentCampaignProvider } from "../hooks/useCurrentCampaign";
import { FirebaseAppProvider } from "../hooks/useFirebaseApp";
import { CurrentUserProvider } from "../hooks/useCurrentUser";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  // Initialize the Firebase app immediately
  useFirebaseApp();

  return (
    <CurrentCharacterProvider>
      <CurrentCampaignProvider>
        <FirebaseAppProvider>
          <CurrentUserProvider>
            <Toaster position="bottom-right"></Toaster>
            <Component {...pageProps} />
          </CurrentUserProvider>
        </FirebaseAppProvider>
      </CurrentCampaignProvider>
    </CurrentCharacterProvider>
  );
}

export default MyApp;
