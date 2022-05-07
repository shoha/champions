import { useDice } from "../hooks/useDice";
import { basicToastRender } from "../utils/diceToasts";
import type { DiceToastRenderer } from "../utils/diceToasts";
import { useMemo } from "react";
import { RollButton } from "./RollButton";

interface Props {
  numSides: number;
  count: number;
}

export const BasicRoller = ({ numSides, count }: Props) => {
  const basicToastRenderer: DiceToastRenderer = useMemo(() => {
    const BasicToast = (results, sides) => {
      const total = results.reduce((memo, r) => memo + r, 0);
      return (
        <div>
          <div className="flex items-center gap-2">
            <h1 className="uppercase text-lg font-semibold">Total: {total}</h1>
          </div>
          <hr className="border-t-2 border-black mb-2"></hr>
          {basicToastRender(results, sides)}
        </div>
      );
    };

    return BasicToast;
  }, []);

  const roll = useDice({ renderToast: basicToastRenderer });

  return (
    <div>
      <RollButton
        onClick={() => {
          roll({ count: count, numSides: numSides });
        }}
      >
        Roll {count}d{numSides}
      </RollButton>
    </div>
  );
};
