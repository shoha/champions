import { useMemo } from "react";
import type { Character } from "../types/Character";
import { coalesceArray } from "../utils/misc";

interface Props {
  character: Character;
}

// TODO: Text and associate nested by ID

export const Powers = ({ character }: Props) => {
  const allPowers = useMemo(() => {
    const powers = coalesceArray(character.POWERS.POWER);
    const multipowers = coalesceArray(character.POWERS.MULTIPOWER);
    const vpps = coalesceArray(character.POWERS.VPP);

    return [...powers, ...multipowers, ...vpps];
  }, [character]);

  const powerRows = useMemo(() => {
    return allPowers.map((power) => {
      return (
        <tr key={power.NAME}>
          <td>{power.BASECOST}</td>
          <td className={power.LEVELS > 0 ? "pl-8" : ""}>
            <span className="italic font-semibold">
              {power.LEVELS > 0 ? `\t${power.LEVELS}) ` : ""}
              {power.NAME}
            </span>
          </td>
          <td></td>
        </tr>
      );
    });
  }, [allPowers]);

  const totalCost = useMemo(() => {
    return allPowers.reduce((memo, power) => {
      return memo + power.BASECOST;
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
