import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { useFirebaseApp } from '../hooks/useFirebaseApp';
import { useCurrentUser } from '../hooks/useCurrentUser';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (authResult) => {
      return false
    },
  },
};

export const Login = () => {
  const firebaseApp = useFirebaseApp()
  const currentUser = useCurrentUser()

  return (
    <>
      {!currentUser && (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth(firebaseApp)} />
      )}
    </>
  )
}
