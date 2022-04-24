import { useMemo } from "react";
import type { Character } from "../types/Character";
import { coalesceArray } from "../utils/misc";

interface Props {
  character: Character;
}

// TODO: ADDRs for cost (I think you sum up the ADDR costs) and text

export const Disadvantages = ({ character }: Props) => {
  const disadvantages = coalesceArray(character.DISADVANTAGES.DISAD);

  const disadvantageRows = useMemo(() => {
    return disadvantages.map((disad, i) => {
      return (
        <tr key={i}>
          <td>{disad.BASECOST}</td>
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
      return memo + disad.BASECOST;
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
