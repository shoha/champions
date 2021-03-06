import { useDice } from "../hooks/useDice";
import { basicToastRender } from "../utils/diceToasts";
import type { DiceToastRenderer } from "../utils/diceToasts";
import { Characteristic } from "../types/Character";
import { Button } from "./Button";
import { useMemo } from "react";
import { Check, Cancel, HexagonDice } from "iconoir-react";
import { RollButton } from "./RollButton";

interface Props {
  label: string;
  characteristic: Characteristic;
}

const checkRoll = (
  characteristic: Characteristic,
  results: number[]
): boolean => {
  const check = results.reduce((memo, r) => memo + r, 0);
  const threshold = parseInt(characteristic.roll);

  return check <= threshold;
};

export const CharacteristicRoller = ({ label, characteristic }: Props) => {
  const characteristicToastRenderer: DiceToastRenderer = useMemo(() => {
    const CharacteristicToast = (results, sides) => {
      return (
        <div>
          <div className="flex items-center gap-2">
            <h1 className="uppercase text-lg font-semibold">{label}</h1>
            <div className={`ml-auto`}>
              {checkRoll(characteristic, results) ? (
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

    return CharacteristicToast;
  }, [label, characteristic]);

  const roll = useDice({ renderToast: characteristicToastRenderer });

  return (
    <div>
      <RollButton
        onClick={() => {
          roll({ count: 3, numSides: 6 });
        }}
      >
        {characteristic.roll}
        <HexagonDice color="black"></HexagonDice>
      </RollButton>
    </div>
  );
};
