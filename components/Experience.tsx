import type { Character } from "../types/Character";
import { Table } from "./Table";

interface Props {
  character: Character;
}

export const Experience = ({ character }: Props) => {
  return (
    <Table className="table-auto w-full text-left table-alternate">
      <tbody>
        <tr>
          <td className="font-bold">Total Earned:</td>
          <td>{character.earned_exp}</td>
        </tr>
        <tr>
          <td>Spent:</td>
          <td>{character.spent_exp}</td>
        </tr>
        <tr>
          <td>Unspent:</td>
          <td>{character.unspent_exp}</td>
        </tr>
        <tr>
          <td>Base Points:</td>
          <td>{character.base_points}</td>
        </tr>
        <tr>
          <td>Disad Points:</td>
          <td>{character.disad_points}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{character.total_points}</td>
        </tr>
      </tbody>
    </Table>
  );
};
