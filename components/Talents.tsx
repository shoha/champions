import { useMemo } from "react";
import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

// TODO: Figure out where cost comes from for talents

export const Talents = ({ character }: Props) => {
  const talentRows = useMemo(() => {
    if (Array.isArray(character.TALENTS.TALENT)) {
      return character.TALENTS.TALENT.map((talent, i) => {
        return (
          <tr key={i}>
            <td>{talent.BASECOST}</td>
            <td>{talent.ALIAS}</td>
          </tr>
        );
      });
    } else {
      return [
        <tr key={0}>
          <td>{character.TALENTS.TALENT.BASECOST}</td>
          <td>{character.TALENTS.TALENT.ALIAS}</td>
        </tr>,
      ];
    }
  }, [character]);

  const totalCost = useMemo(() => {
    if (Array.isArray(character.TALENTS.TALENT)) {
      return character.TALENTS.TALENT.reduce((memo, talent) => {
        return memo + talent.BASECOST;
      }, 0);
    } else {
      return character.TALENTS.TALENT.BASECOST;
    }
  }, [character]);

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
