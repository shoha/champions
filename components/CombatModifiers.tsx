import type { Character } from "../types/Character";
import { Table } from "./Table";

interface Props {
  character: Character;
}

export const CombatModifiers = ({ character }: Props) => {
  return (
    <Table className="table-auto w-full text-left table-alternate">
      <tbody>
        <tr>
          <td className="font-bold">Range</td>
          <td>0-4</td>
          <td>5-8</td>
          <td>9-16</td>
          <td>17-32</td>
          <td>33-64</td>
          <td>65-128</td>
        </tr>
        <tr>
          <td className="font-bold">RMOD</td>
          <td>0</td>
          <td>-2</td>
          <td>-4</td>
          <td>-6</td>
          <td>-8</td>
          <td>-10</td>
        </tr>
      </tbody>
    </Table>
  );
};
