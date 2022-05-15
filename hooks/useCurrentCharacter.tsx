import { createContext, useContext, useEffect, useState } from "react";
import type { Character } from "../types/Character";
import type { Dispatch } from "react";
import { DocumentReference, onSnapshot } from "firebase/firestore";
import { useFirebaseApp } from "../hooks/useFirebaseApp";

interface CharacterState {
  data?: Character;
  ref?: DocumentReference<Character>;
}
export const CurrentCharacterContext =
  createContext<[CharacterState, Dispatch<CharacterState>]>(null);

export const useCurrentCharacter = (): [
  CharacterState,
  Dispatch<CharacterState>
] => {
  const [currentCharacter, setCurrentCharacter] = useContext<
    [CharacterState, Dispatch<CharacterState>]
  >(CurrentCharacterContext);
  const firebaseApp = useFirebaseApp();

  useEffect(() => {
    let unsub;

    if (currentCharacter?.ref) {
      unsub = onSnapshot(currentCharacter.ref, (doc) => {
        setCurrentCharacter({
          data: doc.data(),
          ref: currentCharacter.ref,
        });
      });
    }
  }, [currentCharacter?.ref]);

  return [currentCharacter, setCurrentCharacter];
};

export const CurrentCharacterProvider = ({ children }) => {
  const [currentCharacter, setCurrentCharacter]: [
    CharacterState,
    Dispatch<CharacterState>
  ] = useState<CharacterState>(null);

  return (
    <CurrentCharacterContext.Provider
      value={[currentCharacter, setCurrentCharacter]}
    >
      {children}
    </CurrentCharacterContext.Provider>
  );
};
