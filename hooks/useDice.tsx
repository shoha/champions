import Image from "next/image"
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

export const basicTransformFn = (result, index) => {
  return <Dice number={result}></Dice>
}

type DiceFaceCount = 6

interface RollProps {
  count?: number;
  numSides?: DiceFaceCount;
}

type RollFn = (props: RollProps) => number[]

const roll: RollFn = ({ count = 1, numSides = 6 }) => {
  const dice: number[] = []

  for (let i = 0; i < count; i++) {
    const result = Math.ceil(Math.random() * numSides)
    dice.push(result)
  }

  return dice
}

interface UseDiceProps {
  transformFn?: (roll: number, index: number) => any
  sendToast?: boolean
}

export const useDice = ({ transformFn = (r) => r, sendToast = true }: UseDiceProps) => {
  return (props: RollProps): any => {
    const result = roll(props).map(transformFn)

    if (sendToast) {
      toast(<div>{result}</div>)
    }
  }
}
