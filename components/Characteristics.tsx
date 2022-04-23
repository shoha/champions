import { useMemo } from 'react'
import type { Character, Characteristic } from "../types/Character"
import { CharacteristicRoller } from './CharacteristicRoller'

interface Props {
  character: Character
}

const attrs = ['str', 'dex', 'con', 'body', 'int', 'ego', 'pre', 'pd', 'ed', 'spd', 'rec', 'end', 'stun']
const movements = ['leaping', 'running', 'swimming']

export const Characteristics = ({ character }: Props) => {
  const characteristics = character.characteristics

  const attrRows = useMemo(() => {
    return attrs.map((attr) => {
      const attrData: Characteristic = characteristics[attr] || {}

      return (
        <tr className="table-row" key={attr}>
          <td><CharacteristicRoller label={attr} characteristic={attrData}></CharacteristicRoller></td>
          <td className="uppercase">{attr}</td>
          <td>{attrData.base}</td>
          <td>{attrData.cost}</td>
          <td>{attrData.total}</td>
          <td>{attrData.roll}</td>
          <td>{attrData.notes}</td>
        </tr>
      )
    })
  }, [characteristics])

  const movementRows = useMemo(() => {
    return movements.map((movement) => {
      const movementData = characteristics[movement] || {}

      return (
        <tr className="table-row" key={movement}>
          <td>{movementData.val}</td>
          <td className="uppercase">{movement}</td>
          <td>{movementData.base}</td>
          <td>{movementData.cost}</td>
          <td>{movementData.total}</td>
          <td></td>
          <td></td>
        </tr>
      )
    })
  }, [characteristics])

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr >
          <th>Val</th>
          <th>Char</th>
          <th>Base</th>
          <th>Points</th>
          <th>Total</th>
          <th>Roll</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {attrRows}
        {movementRows}
      </tbody>
    </table>
  )
}
