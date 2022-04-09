export const Appearance = ({ character }) => {
  return (
    <table className="table-auto w-full text-left">
      <tbody>
        <tr>
          <td className="font-bold">Hair Color</td>
          <td>{character.hair_color}</td>
        </tr>
        <tr>
          <td className="font-bold">Eye Color</td>
          <td>{character.eye_color}</td>
        </tr>
        <tr>
          <td className="font-bold">Height</td>
          <td>{character.height}</td>
        </tr>
        <tr>
          <td className="font-bold">Weight</td>
          <td>{character.weight}</td>
        </tr>
        <tr>
          <td className="font-bold">Description</td>
          <td>{character.appearance ? character.appearance : (<span className="italic">None provided</span>)}</td>
        </tr>
      </tbody>
    </table>
  )
}
