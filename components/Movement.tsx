import type { Character } from "../types/Character";
import { Table } from "./Table";

interface Props {
  character: Character;
}

export const Movement = ({ character }: Props) => {
  return (
    <Table className="table-auto w-full text-left table-alternate">
      <thead>
        <tr>
          <th>Type</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Run:</td>
          <td>{character.characteristics.running.total}</td>
        </tr>
        <tr>
          <td>Swim:</td>
          <td>{character.characteristics.swimming.total}</td>
        </tr>
        <tr>
          <td>H. Leap:</td>
          <td>{character.characteristics.leaping.horizontal_total}</td>
        </tr>
        <tr>
          <td>V. Leap:</td>
          <td>{character.characteristics.leaping.vertical_total}</td>
        </tr>
      </tbody>
    </Table>
  );
};
