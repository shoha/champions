import toast from "react-hot-toast";
import { basicToastRender } from "../utils/diceToasts";

interface RollProps {
  count?: number;
  numSides?: number;
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

interface UseDiceProps {
  sendToast?: boolean;
  renderToast?: (results: number[], sides: number, ...rest: any[]) => any;
}

export const useDice = (useProps: UseDiceProps = {}) => {
  const { sendToast = true, renderToast = basicToastRender } = useProps;

  return (props?: RollProps): number[] => {
    const results = roll({ ...props });

    if (sendToast) {
      toast(renderToast(results, props.numSides), { duration: 60000 });
    }

    return results;
  };
};

export const diceStringToRoll = (diceString: string): RollProps | null => {
  const diceRegex = /(?<count>\d*)d(?<numSides>\d*)/;
  const match = diceRegex.exec(diceString);

  if (!match) {
    return null;
  }

  const {
    groups: { count, numSides },
  } = match;

  return {
    count: parseInt(count),
    numSides: parseInt(numSides),
  };
};
