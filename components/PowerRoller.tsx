import { diceStringToRoll, useDice } from "../hooks/useDice";
import { basicToastRender } from "../utils/diceToasts";
import type { DiceToastRenderer } from "../utils/diceToasts";
import { Power } from "../types/Character";
import { Button } from "./Button";
import { useMemo } from "react";
import { Check, Cancel, HexagonDice } from "iconoir-react";
import { RollButton } from "./RollButton";

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

const requiresRollRegex = /Requires A Roll \((?<roll>\d*-)/;

interface Props {
  label: string;
  power: Power;
}

export const PowerRoller = ({ label, power }: Props) => {
  const powerDamageToastRenderer: DiceToastRenderer = useMemo(() => {
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

  const checkRoll = requiresRollRegex.exec(power.text)?.groups?.roll;
  console.log(checkRoll);

  const powerCheckToastRenderer: DiceToastRenderer = useMemo(() => {
    const powerToast = (results, sides) => {
      const counts = pipsAndBody(results);
      const passed = counts.pips <= parseInt(checkRoll);

      return (
        <div>
          <div className="flex items-center gap-2">
            <h1 className="uppercase text-lg font-semibold">
              Power Check: {power.name}
            </h1>
            <div className={`ml-auto`}>
              {passed ? (
                <Check
                  className="bg-green-500 rounded-full"
                  color="white"
                ></Check>
              ) : (
                <Cancel
                  className="bg-red-500 rounded-full"
                  color="white"
                ></Cancel>
              )}
            </div>
          </div>
          <hr className="border-t-2 border-black mb-2"></hr>
          {basicToastRender(results, sides)}
        </div>
      );
    };

    return powerToast;
  }, [power.name, checkRoll]);

  const rollDamage = useDice({ renderToast: powerDamageToastRenderer });
  const rollDamageProps = diceStringToRoll(power.dmg);

  const rollSkill = useDice({ renderToast: powerCheckToastRenderer });

  if (!rollDamageProps?.count || !rollDamageProps?.numSides) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2">
      {checkRoll && (
        <div className="whitespace-nowrap">
          <RollButton
            onClick={() => {
              rollSkill({ count: 3, numSides: 6 });
            }}
            className="bg-white hover:bg-white flex items-center text-black font-normal gap-x-2 rounded border-gray-100 hover:border-gray-300 border-2"
          >
            Check:
            <span className="whitespace-nowrap flex gap-2">
              {checkRoll}
              <HexagonDice
                color="black"
                width={"24px"}
                height={"24px"}
              ></HexagonDice>
            </span>
          </RollButton>
        </div>
      )}
      {power.dmg && (
        <div className="whitespace-nowrap">
          <RollButton
            onClick={() => {
              rollDamage(rollDamageProps);
            }}
            className="bg-white hover:bg-white flex items-center text-black font-normal gap-x-2 rounded border-gray-100 hover:border-gray-300 border-2"
          >
            Damage:{" "}
            <span className="whitespace-nowrap flex gap-2">
              {power.dmg}
              <HexagonDice
                color="black"
                width={"24px"}
                height={"24px"}
              ></HexagonDice>
            </span>
          </RollButton>
        </div>
      )}
    </div>
  );
};
