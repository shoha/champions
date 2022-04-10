import '../styles/globals.css'
import { useFirebaseApp } from '../hooks/useFirebaseApp'
import { CurrentCharacterProvider } from '../hooks/useCurrentCharacter'

function MyApp({ Component, pageProps }) {
  // Initialize the Firebase app immediately
  useFirebaseApp()

  return (
    <CurrentCharacterProvider>
      <Component {...pageProps} />
    </CurrentCharacterProvider>
  )
}

export default MyApp
