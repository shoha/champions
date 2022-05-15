import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
import { Character } from "../types/Character";

const cache = async (ref, characters, setCharacters) => {
  if (ref.id in characters) {
    return characters[ref.id];
  }

  const charData = await getDoc<Character>(ref);
  setCharacters({ ...characters, [ref.id]: charData.data() });
};

const CampaignCharacter = ({ character }) => {
  console.log(character);
  return (
    <div className="flex">
      <div>{character.name}</div>
      <div className="ml-auto">
        {character?.current?.end?.value} / {character?.current?.stun?.value} /{" "}
        {character?.current?.body?.value}
      </div>
    </div>
  );
};

export const CampaignCharacters = () => {
  const [currentCampaign] = useCurrentCampaign();
  const [characters, setCharacters] = useState<{ [key: string]: Character }>(
    {}
  );

  useEffect(() => {
    currentCampaign?.data?.characters?.map((c) => {
      cache(c, characters, setCharacters);
    });
  }, [currentCampaign, characters]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-md font-bold mt-3">Characters</div>
      <hr className="border-t-2 border-black"></hr>
      {currentCampaign?.data?.characters.map((c) => {
        const charData = characters[c.id];
        if (charData) {
          return (
            <CampaignCharacter
              key={c.id}
              character={charData}
            ></CampaignCharacter>
          );
        } else {
          return undefined;
        }
      })}
    </div>
  );
};
