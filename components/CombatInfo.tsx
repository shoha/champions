import type { Character } from "../types/Character";
import { CharacteristicHelper } from "../utils/character";

interface Props {
  character: Character;
}

export const CombatInfo = ({ character }: Props) => {
  const ocvHelper = new CharacteristicHelper(character.CHARACTERISTICS.OCV);
  const dcvHelper = new CharacteristicHelper(character.CHARACTERISTICS.DCV);

  return (
    <table className="table-auto w-full text-left">
      <tbody>
        <tr>
          <td>OCV</td>
          <td>{ocvHelper.totalValue()}</td>
        </tr>
        <tr>
          <td>DCV</td>
          <td>{dcvHelper.totalValue()}</td>
        </tr>
      </tbody>
    </table>
  );
};
