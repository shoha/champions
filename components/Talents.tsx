import { useMemo } from "react";
import type { Character } from "../types/Character";
import { EmptyState } from "./EmptyState";
import { Table } from "./Table";

interface Props {
  character: Character;
}

export const Talents = ({ character }: Props) => {
  const talentRows = useMemo(() => {
    if (Array.isArray(character?.talents?.talent)) {
      return character?.talents?.talent?.map((talent, i) => {
        return (
          <tr key={i}>
            <td>{talent.cost}</td>
            <td>{talent.text}</td>
          </tr>
        );
      });
    } else {
      return [
        <tr key={0}>
          <td>{character?.talents?.talent?.cost}</td>
          <td>{character?.talents?.talent?.text}</td>
        </tr>,
      ];
    }
  }, [character]);

  const totalCost = useMemo(() => {
    if (Array.isArray(character?.talents?.talent)) {
      return character?.talents?.talent?.reduce((memo, talent) => {
        return memo + parseInt(talent.cost);
      }, 0);
    } else {
      return parseInt(character?.talents?.talent?.cost);
    }
  }, [character]);

  if (!character?.talents?.talent) {
    return <EmptyState></EmptyState>;
  }

  return (
    <Table className="table-auto w-full text-left table-alternate">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Talent</th>
        </tr>
      </thead>
      <tbody>
        {talentRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total talents Cost</td>
        </tr>
      </tbody>
    </Table>
  );
};
