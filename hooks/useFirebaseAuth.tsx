import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth'
import { useFirebaseApp } from './useFirebaseApp';

export const useFirebaseAuth = () => {
  const firebaseApp = useFirebaseApp()
  return getAuth(firebaseApp)
}
