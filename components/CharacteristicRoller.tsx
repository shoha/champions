import { useDice } from "../hooks/useDice";
import { basicToastRender } from "../utils/diceToasts";
import type { DiceToastRenderer } from "../utils/diceToasts";
import { Characteristic } from "../types/Character";
import { Button } from "./Button";
import { useMemo } from "react";
import { Plus, Minus } from "iconoir-react";

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
          <div className="flex items-center">
            <h1 className="uppercase text-lg font-semibold">{label}</h1>
            <div className={`ml-auto`}>
              {checkRoll(characteristic, results) ? (
                <Plus
                  className="bg-green-500 rounded-full"
                  color="white"
                ></Plus>
              ) : (
                <Minus
                  className="bg-red-500 rounded-full"
                  color="white"
                ></Minus>
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
      >
        {characteristic.total}
      </Button>
    </div>
  );
};
