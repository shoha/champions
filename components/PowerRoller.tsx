import { diceStringToRoll, useDice } from "../hooks/useDice";
import { basicToastRender } from "../utils/diceToasts";
import type { DiceToastRenderer } from "../utils/diceToasts";
import { Power } from "../types/Character";
import { Button } from "./Button";
import { useMemo } from "react";
import { HexagonDice } from "iconoir-react";

const pipsAndBody = (results: number[]) => {
  const counts = results.reduce(
    (memo, result) => {
      memo.pips += result;
      memo.body += result === 6 ? 2 : result === 1 ? 0 : 1;

      return memo;
    },
    { pips: 0, body: 0 }
  );

  return counts;
};

interface Props {
  label: string;
  power: Power;
}

export const PowerRoller = ({ label, power }: Props) => {
  const powerToastRenderer: DiceToastRenderer = useMemo(() => {
    const powerToast = (results, sides) => {
      const counts = pipsAndBody(results);

      return (
        <div>
          <div className="flex items-left flex-col">
            <h1 className="uppercase text-lg font-semibold">{label}</h1>
            <h2 className="uppercase text-md italic flex gap-2 ">
              <div>
                <span className="">Pips: </span>
                <span className="font-semibold">{counts.pips}</span>
              </div>
              <div>
                <span className="">Body: </span>
                <span className="font-semibold">{counts.body}</span>
              </div>
            </h2>
          </div>
          <hr className="border-t-2 border-black mb-2"></hr>
          {basicToastRender(results, sides)}
        </div>
      );
    };

    return powerToast;
  }, [label]);

  const roll = useDice({ renderToast: powerToastRenderer });
  const rollProps = diceStringToRoll(power.dmg);

  if (!rollProps?.count || !rollProps?.numSides) {
    return <></>;
  }

  return (
    <div>
      <Button
        onClick={() => {
          roll(rollProps);
        }}
        className="bg-transparent hover:bg-transparent flex items-center text-black font-normal gap-x-2 px-0 py-0"
      >
        {power.dmg}
        <HexagonDice color="black" width={"24px"} height={"24px"}></HexagonDice>
      </Button>
    </div>
  );
};
