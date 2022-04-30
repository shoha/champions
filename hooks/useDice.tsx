import { setDoc } from "firebase/firestore";
import { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { basicToastRender } from "../utils/diceToasts";
import { useCurrentCharacter } from "./useCurrentCharacter";

type DiceFaceCount = 6;

interface RollProps {
  count?: number;
  numSides?: DiceFaceCount;
}

type RollFn = (props?: RollProps) => number[];

const roll: RollFn = ({ count = 1, numSides = 6 }) => {
  const dice: number[] = [];

  for (let i = 0; i < count; i++) {
    const result = Math.ceil(Math.random() * numSides);
    dice.push(result);
  }

  return dice;
};

interface DiceRoll {
  results: number[];
  numSides: number;
}

interface UseDiceProps {
  sendToast?: boolean;
  renderToast?: (results: number[], sides: number, ...rest: any[]) => any;
}

export const useDice = (useProps: UseDiceProps = {}) => {
  const { sendToast = true, renderToast = basicToastRender } = useProps;
  const [diceHistory, setDiceHistory] = useDiceHistory();

  return (props?: RollProps): number[] => {
    const results = roll({ ...props });

    if (sendToast) {
      toast(renderToast(results, props.numSides), { duration: 60000 });
    }

    setDiceHistory([
      { results: results, numSides: props.numSides || 6 },
      ...diceHistory,
    ]);

    return results;
  };
};

export const useDiceHistory = (): [DiceRoll[], Dispatch<DiceRoll[]>] => {
  const [diceHistory, setDiceHistory] = useState<DiceRoll[]>([]);
  const [currentCharacter] = useCurrentCharacter();
  let currentCharacterData, currentCharacterRef;

  if (currentCharacter) {
    currentCharacterData = currentCharacter.data;
    currentCharacterRef = currentCharacter.ref;
  }

  useEffect(() => {
    if (!currentCharacterRef) {
      return;
    }

    setDoc(
      currentCharacterRef,
      {
        rollHistory: [...diceHistory],
      },
      { merge: true }
    );
  }, [diceHistory]);

  return [[...diceHistory], setDiceHistory];
};
