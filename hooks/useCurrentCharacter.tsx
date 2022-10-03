import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Character } from "../types/Character";
import type { Dispatch } from "react";
import {
  DocumentReference,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useFirebaseApp } from "../hooks/useFirebaseApp";

export interface CharacterState {
  data?: Character;
  ref?: DocumentReference<Character>;
  all?: QueryDocumentSnapshot<Character>[];
}
export const CurrentCharacterContext =
  createContext<[CharacterState, Dispatch<SetStateAction<CharacterState>>]>(
    null
  );

export const useCurrentCharacter = (): [
  CharacterState,
  Dispatch<SetStateAction<CharacterState>>
] => {
  const [currentCharacter, setCurrentCharacter] = useContext<
    [CharacterState, Dispatch<SetStateAction<CharacterState>>]
  >(CurrentCharacterContext);
  const firebaseApp = useFirebaseApp();

  useEffect(() => {
    let unsub;

    if (currentCharacter?.ref) {
      unsub = onSnapshot(currentCharacter.ref, (doc) => {
        setCurrentCharacter((prev) => ({
          ...prev,
          data: doc.data(),
          ref: currentCharacter.ref,
        }));
      });
    }

    return unsub;
  }, [currentCharacter?.ref?.path]);

  return [currentCharacter, setCurrentCharacter];
};

export const CurrentCharacterProvider = ({ children }) => {
  const [currentCharacter, setCurrentCharacter]: [
    CharacterState,
    Dispatch<SetStateAction<CharacterState>>
  ] = useState<CharacterState>(null);

  return (
    <CurrentCharacterContext.Provider
      value={[currentCharacter, setCurrentCharacter]}
    >
      {children}
    </CurrentCharacterContext.Provider>
  );
};
