export const MartialArts = ({ character }) => {
  console.log(character.martial_arts)
  const maneuverRows = character.martial_arts.maneuvers.maneuver.map((maneuver) => {
    return (
      <tr key={maneuver.name}>
        <td>
          {maneuver.cost}
        </td>
        <td>
          {maneuver.text}
        </td>
      </tr>
    )
  })

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Maneuver</th>
        </tr>
      </thead>
      <tbody>
        {maneuverRows}
      </tbody>

    </table>
  )
}
