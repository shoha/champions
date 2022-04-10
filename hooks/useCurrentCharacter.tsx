import { createContext, useContext, useState } from "react"
import type { Character } from "../types/Character"
import type { Dispatch, SetStateAction } from "react"

export const CurrentCharacterContext = createContext<[Character, Dispatch<Character>]>(null)

export const useCurrentCharacter = (): [Character, Dispatch<Character>] => {
  const [currentCharacter, setCurrentCharacter] = useContext<[Character, Dispatch<Character>]>(CurrentCharacterContext)
  return [currentCharacter, setCurrentCharacter]
}

export const CurrentCharacterProvider = ({ children }) => {
  const [currentCharacter, setCurrentCharacter]: [Character, Dispatch<Character>] = useState<Character>(null)

  return (
    <CurrentCharacterContext.Provider value={[currentCharacter, setCurrentCharacter]}>
      {children}
    </CurrentCharacterContext.Provider>
  )
}
