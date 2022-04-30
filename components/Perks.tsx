import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const Perks = ({ character }: Props) => {
  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Perk</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-lg font-bold">
          <td>0</td>
          <td>Total perks Cost</td>
        </tr>
      </tbody>
    </table>
  );
};
