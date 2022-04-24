import { useDice } from "../hooks/useDice";
import { basicToastRender } from "../utils/diceToasts";
import type { DiceToastRenderer } from "../utils/diceToasts";
import { Button } from "./Button";
import { useMemo } from "react";
import { Check, Cancel, HexagonDice } from "iconoir-react";
import { SkillHelper } from "../utils/character";

interface SkillProps {
  skillHelper: SkillHelper;
}

const checkRoll = (skillHelper: SkillHelper, results: number[]): boolean => {
  const check = results.reduce((memo, r) => memo + r, 0);
  const threshold = parseInt(skillHelper.roll());

  return check <= threshold;
};

export const SkillRoller = ({ skillHelper }: SkillProps) => {
  const skillToastRenderer: DiceToastRenderer = useMemo(() => {
    const SkillToast = (results, sides) => {
      return (
        <div>
          <div className="flex items-center gap-x-2">
            <h1 className="uppercase text-lg font-semibold">
              {skillHelper.displayText()}
            </h1>
            <div className={`ml-auto`}>
              {checkRoll(skillHelper, results) ? (
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

    return SkillToast;
  }, [skillHelper]);

  const roll = useDice({ renderToast: skillToastRenderer });

  return (
    <div>
      <Button
        onClick={() => {
          roll({ count: 3, numSides: 6 });
        }}
        className="bg-transparent hover:bg-transparent flex items-center text-black font-normal gap-x-2 px-0"
      >
        {skillHelper.roll()}
        <HexagonDice color="black"></HexagonDice>
      </Button>
    </div>
  );
};
