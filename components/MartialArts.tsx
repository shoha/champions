import type { Character } from "../types/Character";
import { EmptyState } from "./EmptyState";
import { Table } from "./Table";

interface Props {
  character: Character;
}

export const MartialArts = ({ character }: Props) => {
  if (!character?.martial_arts?.maneuvers?.maneuver) {
    return <EmptyState></EmptyState>;
  }

  const maneuverRows = character.martial_arts?.maneuvers?.maneuver?.map(
    (maneuver) => {
      return (
        <tr key={maneuver.name}>
          <td>{maneuver.name}</td>
          <td>{maneuver.phase}</td>
          <td>
            {maneuver.ocv > 0 && "+"}
            {maneuver.ocv}
          </td>
          <td>
            {maneuver.dcv > 0 && "+"}
            {maneuver.dcv}
          </td>
          <td>{maneuver.effect}</td>
        </tr>
      );
    }
  );

  return (
    <Table className="table-auto w-full text-left table-alternate">
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
    </Table>
  );
};
