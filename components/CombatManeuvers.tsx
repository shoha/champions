export const CombatManeuvers = ({ character }) => {
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
          <td>...</td>
        </tr>
      </tbody>
    </table>
  )
}
