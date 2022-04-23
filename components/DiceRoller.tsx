import { useCallback, useState } from "react"
import { Button } from "./Button"
import { useDice } from "../hooks/useDice"


interface Props {
  showHistory: boolean;
  setShowHistory: (boolean) => void;
}

export const DiceRoller = ({ setShowHistory, showHistory }: Props) => {
  const [numDice, setNumDice] = useState<number>(3)
  const roll = useDice()

  const triggerRoll = useCallback(() => {
    const result = roll({ count: numDice });
  }, [numDice, roll])

  return (
    <div>
      <div className="flex gap-2 ">
        <Button color="blue" onClick={triggerRoll}>Roll</Button>
        <Button color="red" onClick={() => { setNumDice(Math.max(numDice - 1, 1)) }}>-</Button>
        <div className="text-md self-center select-none">{numDice}</div>
        <Button color="green" onClick={() => { setNumDice(Math.max(numDice + 1, 1)) }}>+</Button>
      </div>
      <Button className="mt-2" color="blue" onClick={() => { setShowHistory(!showHistory) }}>Toggle History</Button>
    </div >
  )
}
