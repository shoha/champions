import type { Character } from "../types/Character";
import { CharacteristicHelper } from "../utils/character";

interface Props {
  character: Character;
}

// TODO: Find where damage comes from

export const MartialArts = ({ character }: Props) => {
  if (!character.MARTIALARTS) {
    return <></>;
  }

  const maneuvers = Array.isArray(character.MARTIALARTS.MANEUVER)
    ? character.MARTIALARTS.MANEUVER
    : [character.MARTIALARTS.MANEUVER];

  const maneuverRows = maneuvers.map((maneuver) => {
    const maneuverHelper = new CharacteristicHelper(maneuver);

    return (
      <tr key={maneuver.ALIAS}>
        <td>{maneuver.DISPLAY}</td>
        <td>{maneuver.PHASE}</td>
        <td>{maneuver.OCV}</td>
        <td>{maneuver.DCV}</td>
        <td>{maneuver.EFFECT}</td>
      </tr>
    );
  });

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Maneuver</th>
          <th>Phase</th>
          <th>OCV</th>
          <th>DCV</th>
          <th>Effect</th>
        </tr>
      </thead>
      <tbody>{maneuverRows}</tbody>
    </table>
  );
};
