import { useMemo } from "react";
import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const Disadvantages = ({ character }: Props) => {
  const disadvantageRows = useMemo(() => {
    return character.disads.disad.map((disad, i) => {
      return (
        <tr key={i}>
          <td>{disad.cost}</td>
          <td>{disad.text}</td>
        </tr>
      );
    });
  }, [character]);

  const totalCost = useMemo(() => {
    return character.disads.disad.reduce((memo, disad) => {
      return memo + parseInt(disad.cost);
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
