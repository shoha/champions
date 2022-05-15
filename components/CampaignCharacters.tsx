import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
import { Character } from "../types/Character";

const CampaignCharacter = ({ characterRef }) => {
  const [character, setCurrentCharacter] = useState<Character>();

  useEffect(() => {
    const unsub = onSnapshot(characterRef, (doc) => {
      setCurrentCharacter(doc.data());
    });

    return unsub;
  }, [characterRef]);

  if (!character) {
    return <></>;
  }

  return (
    <div className="flex">
      <div>{character.name}</div>
      <div className="ml-auto">
        {character?.current?.end?.value} END / {character?.current?.stun?.value}{" "}
        STUN / {character?.current?.body?.value} BODY
      </div>
    </div>
  );
};

export const CampaignCharacters = () => {
  const [currentCampaign] = useCurrentCampaign();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-md font-bold mt-3">Characters</div>
      <hr className="border-t-2 border-black"></hr>
      {currentCampaign?.data?.characters.map((cRef) => {
        return (
          <CampaignCharacter
            key={cRef.id}
            characterRef={cRef}
          ></CampaignCharacter>
        );
      })}
    </div>
  );
};
