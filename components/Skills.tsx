import { useMemo } from "react";
import type { Character } from "../types/Character";
import { SkillHelper } from "../utils/character";
import { coalesceArray } from "../utils/misc";

interface Props {
  character: Character;
}

// TODO: Figure out how to compute skill rolls
// TODO: Fix cost computation for ADDERs

export const Skills = ({ character }: Props) => {
  const skills = coalesceArray(character.SKILLS.SKILL);

  const skillRows = useMemo(() => {
    return skills.map((skill, i) => {
      const skillHelper = new SkillHelper(character, skill);

      return (
        <tr key={i}>
          <td>{skill.BASECOST + skill.LEVELS}</td>
          <td>
            {skill.ALIAS}
            {skill.INPUT && `: ${skill.INPUT}`}
          </td>
          <td>{skillHelper.getRoll()}</td>
        </tr>
      );
    });
  }, [skills, character]);

  const totalCost = useMemo(() => {
    return skills.reduce((memo, skill) => {
      return memo + skill.BASECOST;
    }, 0);
  }, [skills]);

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Skill</th>
          <th>Roll</th>
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
