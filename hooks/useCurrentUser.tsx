import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { useFirebaseApp } from "./useFirebaseApp";
import { createContext, useContext, useState } from "react";
import { useCharacterStateMachine } from "./useCharacterStateMachine";

export const CurrentUserContext = createContext(null);

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser;
};

export const CurrentUserProvider = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null);
  const [state, send] = useCharacterStateMachine();

  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    send("LOGGED_IN", user);
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
