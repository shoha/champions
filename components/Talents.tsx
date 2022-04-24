import { useMemo } from "react";
import type { Character } from "../types/Character";
import { coalesceArray } from "../utils/misc";

const EMPTY_STATE = <div>No perks available.</div>;

interface Props {
  character: Character;
}

// TODO: Figure out where cost comes from for talents

export const Talents = ({ character }: Props) => {
  const talents = coalesceArray(character.TALENTS.TALENT);

  const talentRows = useMemo(() => {
    return talents.map((talent, i) => {
      return (
        <tr key={i}>
          <td className="align-top">{talent.BASECOST}</td>
          <td>{talent.ALIAS}</td>
        </tr>
      );
    });
  }, [talents]);

  const totalCost = useMemo(() => {
    return talents.reduce((memo, talent) => {
      return memo + talent.BASECOST;
    }, 0);
  }, [talents]);

  if (talents.length === 0) {
    return EMPTY_STATE;
  }

  return (
    <table className="table-auto w-full text-left">
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
    </table>
  );
};
