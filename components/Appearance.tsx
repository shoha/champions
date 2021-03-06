import type { Character } from "../types/Character";
import { Table } from "./Table";

interface Props {
  character: Character;
}

export const Appearance = ({ character }: Props) => {
  return (
    <Table className="table-auto w-full text-left table-alternate">
      <tbody>
        <tr>
          <td className="font-bold">Hair Color</td>
          <td>{character.hair_color}</td>
        </tr>
        <tr>
          <td className="font-bold">Eye Color</td>
          <td>{character.eye_color}</td>
        </tr>
        <tr>
          <td className="font-bold">Height</td>
          <td>{character.height}</td>
        </tr>
        <tr>
          <td className="font-bold">Weight</td>
          <td>{character.weight}</td>
        </tr>
        <tr>
          <td className="font-bold">Description</td>
          <td>
            {character.appearance ? (
              character.appearance
            ) : (
              <span className="italic">None provided</span>
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
