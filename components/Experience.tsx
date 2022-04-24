import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

// TODO: Find remaining exp data

export const Experience = ({ character }: Props) => {
  return (
    <table className="table-auto w-full text-left">
      <tbody>
        <tr>
          <td className="font-bold">Total Earned:</td>
          <td>{character.BASIC_CONFIGURATION.EXPERIENCE}</td>
        </tr>
        {/* <tr>
          <td>Spent:</td>
          <td>{character.spent_exp}</td>
        </tr>
        <tr>
          <td>Unspent:</td>
          <td>{character.unspent_exp}</td>
        </tr> */}
        <tr>
          <td>Base Points:</td>
          <td>{character.BASIC_CONFIGURATION.BASE_POINTS}</td>
        </tr>
        <tr>
          <td>Disad Points:</td>
          <td>{character.BASIC_CONFIGURATION.DISAD_POINTS}</td>
        </tr>
        {/* <tr>
          <td>Total:</td>
          <td>{character.total_points}</td>
        </tr> */}
      </tbody>
    </table>
  );
};
