import type { Character } from "../types/Character";
import { CharacteristicHelper } from "../utils/character";

interface Props {
  character: Character;
}

export const Movement = ({ character }: Props) => {
  const runHelper = new CharacteristicHelper(character.CHARACTERISTICS.RUNNING);
  const swimHelper = new CharacteristicHelper(
    character.CHARACTERISTICS.SWIMMING
  );
  const leapHelper = new CharacteristicHelper(
    character.CHARACTERISTICS.LEAPING
  );

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Type</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Run:</td>
          <td>{runHelper.totalValue()}m</td>
        </tr>
        <tr>
          <td>Swim:</td>
          <td>{swimHelper.totalValue()}m</td>
        </tr>
        <tr>
          <td>H. Leap:</td>
          <td>{leapHelper.totalValue()}m</td>
        </tr>
        <tr>
          <td>V. Leap:</td>
          <td>{leapHelper.totalValue() / 2}m</td>
        </tr>
      </tbody>
    </table>
  );
};
