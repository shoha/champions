import { useMemo } from "react";
import type { Character, Characteristic } from "../types/Character";
import { coalesceArray } from "../utils/misc";

const adderCost = (parent: Characteristic) => {
  if (!parent?.ADDER) {
    console.log(parent);
    return 0;
  }

  const adders = coalesceArray(parent.ADDER);

  const inc = adders.reduce((memo, adder) => {
    return memo + adder.BASECOST + adderCost(adder.ADDER);
  }, 0);

  return inc;
};

interface Props {
  character: Character;
}

export const Disadvantages = ({ character }: Props) => {
  const disadvantages = coalesceArray(character.DISADVANTAGES.DISAD);

  const disadvantageRows = useMemo(() => {
    return disadvantages.map((disad, i) => {
      return (
        <tr key={i}>
          <td>{disad.BASECOST + adderCost(disad)}</td>
          <td>
            <div>
              {disad.ALIAS}
              {disad.INPUT && `: ${disad.INPUT}`}
            </div>
            {disad.NOTES && (
              <div className="pl-4">
                <span className="font-bold italic">Notes: </span>
                {disad.NOTES}
              </div>
            )}
          </td>
        </tr>
      );
    });
  }, [disadvantages]);

  const totalCost = useMemo(() => {
    return disadvantages.reduce((memo, disad) => {
      return memo + disad.BASECOST + adderCost(disad);
    }, 0);
  }, [disadvantages]);

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Disadvantage</th>
        </tr>
      </thead>
      <tbody>
        {disadvantageRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total Disadvantages Cost</td>
        </tr>
      </tbody>
    </table>
  );
};
