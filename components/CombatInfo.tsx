export const CombatInfo = ({ character }) => {
  return (
    <table className="table-auto w-full text-left">
      <tbody>
        <tr>
          <td>OCV</td>
          <td>{character.ocv}</td>
        </tr>
        <tr>
          <td>DCV</td>
          <td>{character.dcv}</td>
        </tr>
      </tbody>

    </table>
  )
}
