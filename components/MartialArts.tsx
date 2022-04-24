import type { Character } from "../types/Character";
import { CharacteristicHelper } from "../utils/character";

interface Props {
  character: Character;
}

// TODO: Find where damage comes from

const EMPTY_STATE = <div>No maneuvers availble.</div>;

export const MartialArts = ({ character }: Props) => {
  if (!character.MARTIALARTS) {
    return EMPTY_STATE;
  }

  const maneuvers = Array.isArray(character.MARTIALARTS.MANEUVER)
    ? character.MARTIALARTS.MANEUVER
    : [character.MARTIALARTS.MANEUVER];

  const maneuverRows = maneuvers.map((maneuver) => {
    const maneuverHelper = new CharacteristicHelper(maneuver);

    return (
      <tr key={maneuver.ID}>
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
      <tbody>{maneuverRows.length > 0 ? maneuverRows : EMPTY_STATE}</tbody>
    </table>
  );
};
