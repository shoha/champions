import '../styles/globals.css'
import { useFirebaseApp } from '../hooks/useFirebaseApp'
import { CurrentCharacterProvider } from '../hooks/useCurrentCharacter'
import { FirebaseAppProvider } from '../hooks/useFirebaseApp'
import { CurrentUserProvider } from '../hooks/useCurrentUser'

function MyApp({ Component, pageProps }) {
  // Initialize the Firebase app immediately
  useFirebaseApp()

  return (
    <CurrentCharacterProvider>
      <FirebaseAppProvider>
        <CurrentUserProvider>
          <Component {...pageProps} />
        </CurrentUserProvider>
      </FirebaseAppProvider>
    </CurrentCharacterProvider>
  )
}

export default MyApp
