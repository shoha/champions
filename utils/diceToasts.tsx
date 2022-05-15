import Image from "next/image";

interface DiceProps {
  number: number;
  sides?: number;
}

const Dice = ({ number, sides = 6 }: DiceProps) => {
  return (
    <img
      src={`/dice/d${sides}-${number}.svg`}
      width={25}
      height={25}
      alt={`A ${sides}-sided die showing ${number}`}
    ></img>
  );
};

export const makeCloseable = (renderer) => {};

export type DiceToastRenderer = (
  results: number[],
  sides: number
) => JSX.Element;

export const basicToastRender: DiceToastRenderer = (results, sides) => {
  const t: any = {};
  const dice = results.map((r, i) => (
    <Dice number={r} sides={sides} key={i}></Dice>
  ));

  return <div className="flex gap-2">{dice}</div>;
};
