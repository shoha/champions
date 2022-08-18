import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { useFirebaseApp } from "./useFirebaseApp";
import { createContext, useContext, useState } from "react";
import { rootService } from "../hooks/useAppStateMachine";

export const CurrentUserContext = createContext(null);

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser;
};

export const CurrentUserProvider = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user && rootService.state.value === "init") {
      rootService.send("LOGGED_IN");
    }

    setCurrentUser(user);
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
