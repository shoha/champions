import { useDice } from "../hooks/useDice";
import { basicToastRender } from "../utils/diceToasts";
import type { DiceToastRenderer } from "../utils/diceToasts";
import { Characteristic } from "../types/Character";
import { Button } from "./Button";
import { useMemo } from "react";
import { Check, Cancel, HexagonDice } from "iconoir-react";
import { CharacteristicHelper } from "../utils/character";

interface Props {
  label: string;
  characteristic: Characteristic;
}

const checkRoll = (
  charHelper: CharacteristicHelper,
  results: number[]
): boolean => {
  const check = results.reduce((memo, r) => memo + r, 0);
  const threshold = parseInt(charHelper.getRoll());

  return check <= threshold;
};

export const CharacteristicRoller = ({ label, characteristic }: Props) => {
  const charHelper = new CharacteristicHelper(characteristic);

  const characteristicToastRenderer: DiceToastRenderer = useMemo(() => {
    const CharacteristicToast = (results, sides) => {
      return (
        <div>
          <div className="flex items-center">
            <h1 className="uppercase text-lg font-semibold">{label}</h1>
            <div className={`ml-auto`}>
              {checkRoll(charHelper, results) ? (
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
      <Button
        onClick={() => {
          roll({ count: 3, numSides: 6 });
        }}
        className="bg-transparent hover:bg-transparent flex items-center text-black font-normal gap-x-2 px-0"
      >
        {charHelper.totalValue()}
        <HexagonDice color="black"></HexagonDice>
      </Button>
    </div>
  );
};
