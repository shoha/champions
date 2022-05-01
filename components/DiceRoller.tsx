import { useState } from "react";
import { Button } from "./Button";
import { BasicRoller } from "./BasicRoller";

interface Props {}

export const DiceRoller = ({}: Props) => {
  const [numDice, setNumDice] = useState<number>(3);

  return (
    <div>
      <div className="flex gap-2 ">
        <Button
          color="red"
          onClick={() => {
            setNumDice(Math.max(numDice - 1, 1));
          }}
          className="flex-1"
        >
          -
        </Button>
        <div className="flex-1">
          <BasicRoller numSides={6} count={numDice}></BasicRoller>
        </div>
        <Button
          color="green"
          onClick={() => {
            setNumDice(Math.max(numDice + 1, 1));
          }}
          className="flex-1"
        >
          +
        </Button>
      </div>
    </div>
  );
};
