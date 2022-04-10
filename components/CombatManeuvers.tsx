import type { Character } from "../types/Character"

interface Props {
  character: Character
}

export const CombatManeuvers = ({ character }: Props) => {
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
      <tbody>
        <tr>
          <td>Block</td>
          <td>1/2</td>
          <td>+0</td>
          <td>+0</td>
          <td>Block, abort</td>
        </tr>
        <tr>
          <td>Brace</td>
          <td>0</td>
          <td>+2</td>
          <td>1/2</td>
          <td>+2 vs. Range Mod.</td>
        </tr>
        <tr>
          <td>Disarm</td>
          <td>1/2</td>
          <td>-2</td>
          <td>+0</td>
          <td>Can disarm</td>
        </tr>
        <tr>
          <td>Dodge</td>
          <td>1/2</td>
          <td>--</td>
          <td>+3</td>
          <td>Abort, vs. all attacks</td>
        </tr>
        <tr>
          <td>Grab</td>
          <td>1/2</td>
          <td>-1</td>
          <td>-2</td>
          <td>Grab two limbs</td>
        </tr>
        <tr>
          <td>Grab By</td>
          <td>1/2</td>
          <td>-3</td>
          <td>-4</td>
          <td>Move and Grab</td>
        </tr>
        <tr>
          <td>Haymaker</td>
          <td>1/2*</td>
          <td>+0</td>
          <td>-5</td>
          <td>+4 DC attack damange</td>
        </tr>
        <tr>
          <td>Move By</td>
          <td>1/2</td>
          <td>-2</td>
          <td>-2</td>
          <td>STR/2 + v/5</td>
        </tr>
        <tr>
          <td>Move Through</td>
          <td>1/2</td>
          <td>-v/5</td>
          <td>-3</td>
          <td>STR + v/3</td>
        </tr>
        <tr>
          <td>Set</td>
          <td>1</td>
          <td>+1</td>
          <td>+0</td>
          <td>Ranged Attacks only</td>
        </tr>
        <tr>
          <td>Strike</td>
          <td>1/2</td>
          <td>+0</td>
          <td>+0</td>
          <td>STR or weapon</td>
        </tr>
        <tr>
          <td>Legsweep</td>
          <td>1/2</td>
          <td>+2</td>
          <td>-1</td>
          <td>3d6 Strike, Target Falls</td>
        </tr>
        <tr>
          <td>Martial Block</td>
          <td>1/2</td>
          <td>+2</td>
          <td>+2</td>
          <td>Block, Abort</td>
        </tr>
        <tr>
          <td>Martial Disarm</td>
          <td>1/2</td>
          <td>-1</td>
          <td>+1</td>
          <td>Disarm; 20 STR to Disarm roll</td>
        </tr>
        <tr>
          <td>Martial Dodge</td>
          <td>1/2</td>
          <td>--</td>
          <td>+5</td>
          <td>Dodge, Affects All Attacks</td>
        </tr>
      </tbody>
    </table>
  )
}
