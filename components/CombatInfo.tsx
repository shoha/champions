import type { Character } from "../types/Character";
import { Table } from "./Table";

interface Props {
  character: Character;
}

export const CombatInfo = ({ character }: Props) => {
  return (
    <Table className="table-auto w-full text-left table-alternate">
      <tbody>
        <tr>
          <td>OCV</td>
          <td>{character.ocv}</td>
        </tr>
        <tr>
          <td>DCV</td>
          <td>{character.dcv}</td>
        </tr>
      </tbody>
    </Table>
  );
};
