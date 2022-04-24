import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const Appearance = ({ character }: Props) => {
  return (
    <table className="table-auto w-full text-left">
      <tbody>
        <tr>
          <td className="font-bold">Hair Color</td>
          <td>{character.CHARACTER_INFO.HAIR_COLOR}</td>
        </tr>
        <tr>
          <td className="font-bold">Eye Color</td>
          <td>{character.CHARACTER_INFO.EYE_COLOR}</td>
        </tr>
        <tr>
          <td className="font-bold">Height</td>
          <td>{Math.round(character.CHARACTER_INFO.HEIGHT)}in</td>
        </tr>
        <tr>
          <td className="font-bold">Weight</td>
          <td>{Math.round(character.CHARACTER_INFO.WEIGHT)}lb</td>
        </tr>
        <tr>
          <td className="font-bold">Description</td>
          <td>
            {character.CHARACTER_INFO.APPEARANCE ? (
              character.CHARACTER_INFO.APPEARANCE
            ) : (
              <span className="italic">None provided</span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
