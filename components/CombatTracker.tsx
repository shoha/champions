import { useCallback, useMemo, useState } from "react";
import type { Character, Characteristic } from "../types/Character";

interface ActiveStatProps {
  character: Character;
  stat: Characteristic;
  name: string;
}

const ActiveStat = ({ character, stat, name }: ActiveStatProps) => {
  const [current, updateCurrent] = useState<number>(stat.total)

  const increment = useCallback(() => {
    updateCurrent(current + 1)
  }, [current, updateCurrent])

  const decrement = useCallback(() => {
    updateCurrent(current - 1)
  }, [current, updateCurrent])

  return (
    <div className="text-center">
      <div className="font-semibold mb-2">
        {name}<span className="font-normal italic"> (max {stat.total})</span>
      </div>
      <div className="text-3xl mb-2">
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
  console.log(phases)
  const dots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    return (
      <div key={i} className={`text-white rounded-lg p-4 flex-0 text-center w-14 ${phases.indexOf(i.toString()) > -1 ? "bg-green-500" : "bg-gray-500"}`}>
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
  character: Character
}


export const CombatTracker = ({ character }: Props) => {
  return (
    <div className="flex gap-4">
      <ActivePhases character={character}></ActivePhases>

      <div className="flex ml-auto gap-4">
        <ActiveStat name="END" stat={character.characteristics.end} character={character}></ActiveStat>
        <ActiveStat name="STUN" stat={character.characteristics.stun} character={character}></ActiveStat>
        <ActiveStat name="BODY" stat={character.characteristics.body} character={character}></ActiveStat>
      </div>
    </div>
  )
}
