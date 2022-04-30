import { useMemo } from "react";
import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const Powers = ({ character }: Props) => {
  const powerRows = useMemo(() => {
    return character.powers.power.map((power) => {
      return (
        <tr key={power.name}>
          <td>{power.cost}</td>
          <td className={power.list_prefix ? "pl-8" : ""}>
            <span className="italic font-semibold">
              {power.list_prefix ? `\t${power.list_prefix} ` : ""}
              {power.name}
            </span>
            : {power.text}
          </td>
          <td>{power.end}</td>
        </tr>
      );
    });
  }, [character]);

  const totalCost = useMemo(() => {
    return character.powers.power.reduce((memo, power) => {
      return memo + parseInt(power.cost);
    }, 0);
  }, [character]);

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Power</th>
          <th>END</th>
        </tr>
      </thead>
      <tbody>
        {powerRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total Powers Cost</td>
        </tr>
      </tbody>
    </table>
  );
};
