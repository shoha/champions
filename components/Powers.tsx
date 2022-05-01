import { useMemo } from "react";
import type { Character } from "../types/Character";
import { PowerRoller } from "./PowerRoller";
import { EmptyState } from "./EmptyState";

interface Props {
  character: Character;
}

export const Powers = ({ character }: Props) => {
  const powerRows = useMemo(() => {
    return character?.powers?.power?.map((power, i) => {
      return (
        <tr key={i}>
          <td className="align-top">{power.cost}</td>
          <td className="align-top text-left">
            {power.dmg && (
              <PowerRoller power={power} label={power.name}></PowerRoller>
            )}
          </td>
          <td
            className={`${power.list_prefix ? "pl-8" : ""} align-top text-left`}
          >
            <span className="italic font-semibold">
              {power.list_prefix ? `\t${power.list_prefix} ` : ""}
              {power.name}
            </span>
            : {power.text}
          </td>
          <td className="align-top">{power.end}</td>
        </tr>
      );
    });
  }, [character]);

  const totalCost = useMemo(() => {
    return character?.powers?.power?.reduce((memo, power) => {
      return memo + parseInt(power.cost);
    }, 0);
  }, [character]);

  if (!character?.powers?.power) {
    return <EmptyState></EmptyState>;
  }

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Rolls</th>
          <th>Power</th>
          <th>END</th>
        </tr>
      </thead>
      <tbody>
        {powerRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td colSpan={2}>Total Powers Cost</td>
        </tr>
      </tbody>
    </table>
  );
};
