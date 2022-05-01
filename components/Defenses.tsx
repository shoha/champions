import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const Defenses = ({ character }: Props) => {
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
          <td>Mental Defense</td>
          <td>{character.mental_defense_total}</td>
          <td></td>
        </tr>
        <tr>
          <td>Power Defense</td>
          <td>{character.power_defense_total}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
