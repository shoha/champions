import type { Character } from "../types/Character";
import { CharacteristicHelper } from "../utils/character";

interface Props {
  character: Character;
}

// TODO: find other defenses

export const Defenses = ({ character }: Props) => {
  const pdHelper = new CharacteristicHelper(character.CHARACTERISTICS.PD);
  const edHelper = new CharacteristicHelper(character.CHARACTERISTICS.ED);

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Physical Defense</td>
          <td>{pdHelper.totalValue()}</td>
          <td></td>
        </tr>
        {/* <tr>
          <td>Res. Phys. Defense</td>
          <td>??</td>
          <td></td>
        </tr> */}
        <tr>
          <td>Energy Defense</td>
          <td>{edHelper.totalValue()}</td>
          <td></td>
        </tr>
        {/* <tr>
          <td>Res. Energy Defense</td>
          <td>??</td>
          <td></td>
        </tr>
        <tr>
          <td>Mental Defense</td>
          <td>{character.mental_defense_total}</td>
          <td></td>
        </tr>
        <tr>
          <td>Power Defense</td>
          <td>{character.power_defense_total}</td>
          <td></td>
        </tr> */}
      </tbody>
    </table>
  );
};
