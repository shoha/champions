import { useMemo } from "react";
import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const Disadvantages = ({ character }: Props) => {
  const disadvantageRows = useMemo(() => {
    return character.DISADVANTAGES.DISAD.map((disad, i) => {
      return (
        <tr key={i}>
          <td>{disad.BASECOST}</td>
          <td>{disad.ALIAS}</td>
        </tr>
      );
    });
  }, [character]);

  const totalCost = useMemo(() => {
    return character.DISADVANTAGES.DISAD.reduce((memo, disad) => {
      return memo + disad.BASECOST;
    }, 0);
  }, [character]);

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
