import type { Character } from "../types/Character"

interface Props {
  character: Character
}

export const CharacterIntro = ({ character }: Props) => {
  return (
    <>
      <h2 className="text-3xl italic my-2">{character.name}</h2>
      <h2 className="text-2xl italic my-2">{character.campaign_name} by {character.gm}</h2>
    </>
  )
}
