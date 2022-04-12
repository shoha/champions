import { setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DocumentReference } from "firebase/firestore";
import type { Character, Characteristic } from "../types/Character";

interface ActiveStatProps {
  character: Character;
  characterRef?: DocumentReference<Character>;
  stat: Characteristic;
  name: string;
}

const ActiveStat = ({ character, characterRef, name }: ActiveStatProps) => {
  const statBlock = character.characteristics[name]
  const defaultValue = character.current[name].value || statBlock.total
  const [current, updateCurrent] = useState<number>(defaultValue)

  const increment = useCallback(() => {
    updateCurrent(current + 1)
  }, [current, updateCurrent])

  const decrement = useCallback(() => {
    updateCurrent(current - 1)
  }, [current, updateCurrent])

  useEffect(() => {
    if (!characterRef) {
      return
    }

    setDoc(characterRef, {
      current: {
        [name]: {
          value: current
        }
      }
    } as Character, { merge: true })

    return
  }, [current, characterRef])

  return (
    <div className="text-center">
      <div className="font-semibold mb-2">
        <span className="uppercase">{name}</span><span className="font-normal italic"> (max {statBlock.total})</span>
      </div>
      <div className="text-3xl mb-2 select-none">
        {current}
      </div>
      <div className="flex gap-2 justify-center">
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4' onClick={() => decrement()}>-</button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4' onClick={() => increment()}>+</button>
      </div>
    </div>
  )
}

interface ActivePhasesProps {
  character: Character;
}

const ActivePhases = ({ character }: ActivePhasesProps) => {
  const phases = character.characteristics.spd.notes.match(/(\d+)/g)
  const dots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    return (
      <div key={i} className={`text-white rounded-lg p-4 flex-0 text-center w-14 select-none ${phases.indexOf(i.toString()) > -1 ? "bg-green-500" : "bg-gray-500"}`}>
        {i}
      </div>
    )
  })

  return (
    <div>
      <div className="font-semibold mb-2">Phases</div>
      <div className="flex flex-wrap gap-2" style={{ maxWidth: "376px" }}>
        {dots}
      </div>
    </div>
  )
}

interface Props {
  character: Character;
  characterRef?: DocumentReference<Character>;
}


export const CombatTracker = ({ character, characterRef }: Props) => {
  return (
    <div className="flex gap-4">
      <ActivePhases character={character}></ActivePhases>

      <div className="flex ml-auto gap-4">
        <ActiveStat name="end" stat={character.characteristics.end} character={character} characterRef={characterRef}></ActiveStat>
        <ActiveStat name="stun" stat={character.characteristics.stun} character={character} characterRef={characterRef}></ActiveStat>
        <ActiveStat name="body" stat={character.characteristics.body} character={character} characterRef={characterRef}></ActiveStat>
      </div>
    </div>
  )
}
