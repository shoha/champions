import { useMemo } from "react"
import type { Character } from "../types/Character"

interface Props {
  character: Character
}


export const Skills = ({ character }: Props) => {
  const skillRows = useMemo(() => {
    return character.skills.skill.map((skill, i) => {
      return (
        <tr key={i}>
          <td>{skill.cost}</td>
          <td>{skill.text}</td>
        </tr>
      )
    })
  }, [character])

  const totalCost = useMemo(() => {
    return character.skills.skill.reduce((memo, skill) => {
      return memo + parseInt(skill.cost)
    }, 0)
  }, [character])

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Skill</th>
        </tr>
      </thead>
      <tbody>
        {skillRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total Skills Cost</td>
        </tr>
      </tbody>
    </table>
  )
}
