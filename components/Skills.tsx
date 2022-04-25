import { useMemo } from "react";
import type { Character } from "../types/Character";
import { SkillHelper } from "../utils/character";
import { coalesceArray } from "../utils/misc";
import { SkillRoller } from "../components/SkillRoller";

interface Props {
  character: Character;
}

// TODO: Fix cost computation for ADDERs

export const Skills = ({ character }: Props) => {
  const skills = coalesceArray(character.SKILLS.SKILL);

  const skillRows = useMemo(() => {
    return skills.map((skill, i) => {
      const skillHelper = new SkillHelper(character, skill);
      const isRollable = !!skillHelper.roll();

      return (
        <tr key={i}>
          <td>{skillHelper.totalCost()}</td>
          <td>{skillHelper.displayText()}</td>
          <td>
            {isRollable ? (
              <SkillRoller skillHelper={skillHelper}></SkillRoller>
            ) : (
              skillHelper.roll()
            )}
          </td>
        </tr>
      );
    });
  }, [skills, character]);

  const totalCost = useMemo(() => {
    return skills.reduce((memo, skill) => {
      const skillHelper = new SkillHelper(character, skill);
      return memo + skillHelper.totalCost();
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
