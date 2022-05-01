import { useState } from "react";
import { Button } from "./Button";
import { useDice } from "../hooks/useDice";
import { BasicRoller } from "./BasicRoller";

interface Props {
  showHistory: boolean;
  setShowHistory: (boolean) => void;
}

export const DiceRoller = ({ setShowHistory, showHistory }: Props) => {
  const [numDice, setNumDice] = useState<number>(3);
  const roll = useDice();

  return (
    <div>
      <div className="flex gap-2 ">
        <BasicRoller numSides={6} count={numDice}></BasicRoller>
        <Button
          color="red"
          onClick={() => {
            setNumDice(Math.max(numDice - 1, 1));
          }}
        >
          -
        </Button>
        <div className="text-md self-center select-none">{numDice}</div>
        <Button
          color="green"
          onClick={() => {
            setNumDice(Math.max(numDice + 1, 1));
          }}
        >
          +
        </Button>
      </div>
      <Button
        className="mt-2"
        color="blue"
        onClick={() => {
          setShowHistory(!showHistory);
        }}
      >
        Toggle History
      </Button>
    </div>
  );
};
