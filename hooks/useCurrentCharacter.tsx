import { createContext, useContext, useState } from "react";
import type { Character } from "../types/Character";
import type { Dispatch } from "react";
import { DocumentReference } from "firebase/firestore";

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
