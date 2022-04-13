import Image from "next/image"
import { useState } from "react"
import { Button } from "./Button"
import toast from 'react-hot-toast'

const diceImages = [
  "/dice/dice-six-faces-one.svg",
  "/dice/dice-six-faces-two.svg",
  "/dice/dice-six-faces-three.svg",
  "/dice/dice-six-faces-four.svg",
  "/dice/dice-six-faces-five.svg",
  "/dice/dice-six-faces-six.svg",
]

interface DiceProps {
  number: number
}

const Dice = ({ number }: DiceProps) => {
  return (
    <Image src={diceImages[number - 1]} width={25} height={25} alt={`A dice showing ${number}`}></Image >
  )
}

const DICE_SIDES = 6;

const roll = (count: number = 1, setDice) => {
  const dice = []

  for (let i = 0; i < count; i++) {
    const result = Math.ceil(Math.random() * DICE_SIDES)
    dice.push(<Dice number={result} key={i}></Dice>)
  }

  toast(<div>{dice}</div>)

  setDice(dice)
}

interface Props {
  showHistory: boolean;
  setShowHistory: (boolean) => void;
}

export const DiceRoller = ({ setShowHistory, showHistory }: Props) => {
  const [dice, setDice] = useState<JSX.Element[]>([])
  const [numDice, setNumDice] = useState<number>(3)

  return (
    <div>
      <div className="flex gap-2 ">
        <Button color="blue" onClick={() => { roll(numDice, setDice) }}>Roll</Button>
        <Button color="red" onClick={() => { setNumDice(Math.max(numDice - 1, 1)) }}>-</Button>
        <div className="text-md self-center select-none">{numDice}</div>
        <Button color="green" onClick={() => { setNumDice(Math.max(numDice + 1, 1)) }}>+</Button>
      </div>
      <Button className="mt-2" color="blue" onClick={() => { setShowHistory(!showHistory) }}>Toggle History</Button>
    </div>
  )
}
