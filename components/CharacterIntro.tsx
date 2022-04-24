import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export const CharacterIntro = ({ character }: Props) => {
  return (
    <>
      <h2 className="text-3xl italic my-2">
        {character.CHARACTER_INFO.CHARACTER_NAME}
      </h2>
      <h2 className="text-2xl italic my-2">
        {character.CHARACTER_INFO.CAMPAIGN_NAME} by{" "}
        {character.CHARACTER_INFO.GM}
      </h2>
    </>
  );
};
