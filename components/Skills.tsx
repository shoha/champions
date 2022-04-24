import { useMemo } from "react";
import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const Skills = ({ character }: Props) => {
  const skills = Array.isArray(character.SKILLS.SKILL)
    ? character.SKILLS.SKILL
    : [character.SKILLS.SKILL];

  const skillRows = useMemo(() => {
    return skills.map((skill, i) => {
      return (
        <tr key={i}>
          <td>{skill.BASECOST}</td>
          <td>{skill.ALIAS}</td>
        </tr>
      );
    });
  }, [character]);

  const totalCost = useMemo(() => {
    return skills.reduce((memo, skill) => {
      return memo + skill.BASECOST;
    }, 0);
  }, [character]);

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Skill</th>
        </tr>
      </thead>
      <tbody>
        {skillRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total Skills Cost</td>
        </tr>
      </tbody>
    </table>
  );
};
