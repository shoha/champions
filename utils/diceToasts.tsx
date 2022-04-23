import Image from "next/image"

interface DiceProps {
  number: number,
  sides?: number
}

const Dice = ({ number, sides = 6 }: DiceProps) => {
  return (
    <Image src={`/dice/d${sides}-${number}.svg`} width={25} height={25} alt={`A ${sides}-sided die showing ${number}`}></Image >
  )
}

export type DiceToastRenderer = (results: number[], sides: number) => JSX.Element

export const basicToastRender: DiceToastRenderer = (results, sides) => {
  const dice = results.map((r, i) => <Dice number={r} sides={sides} key={i}></Dice>)

  return (
    <div>
      {dice}
    </div>
  )
}
