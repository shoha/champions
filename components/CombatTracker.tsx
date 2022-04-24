import { setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import type { DocumentReference } from "firebase/firestore";
import type { Character, Characteristic } from "../types/Character";
import { CharacteristicLabel } from "../types/Character";
import { Button } from "./Button";
import { CharacterHelper, CharacteristicHelper } from "../utils/character";

interface ActiveStatProps {
  character: Character;
  characterRef?: DocumentReference<Character>;
  stat: Characteristic;
  name: CharacteristicLabel;
}

const ActiveStat = ({ character, characterRef, name }: ActiveStatProps) => {
  const statBlock = character.CHARACTERISTICS[name];
  const statHelper = new CharacteristicHelper(statBlock);
  const defaultValue =
    character.current?.[name]?.value || statHelper.totalValue();
  const [current, updateCurrent] = useState<number>(defaultValue);

  const increment = useCallback(() => {
    updateCurrent(current + 1);
  }, [current, updateCurrent]);

  const decrement = useCallback(() => {
    updateCurrent(current - 1);
  }, [current, updateCurrent]);

  useEffect(() => {
    if (!characterRef) {
      return;
    }

    setDoc(
      characterRef,
      {
        current: {
          [name]: {
            value: current,
          },
        },
      } as Character,
      { merge: true }
    );

    return;
  }, [current, characterRef, name]);

  return (
    <div className="text-center">
      <div className="font-semibold mb-2">
        <span className="uppercase">{name}</span>
        <span className="font-normal italic">
          {" "}
          (max {statHelper.totalValue()})
        </span>
      </div>
      <div className="text-3xl mb-2 select-none">{current}</div>
      <div className="flex gap-2 justify-center">
        <Button onClick={() => decrement()} color="red">
          -
        </Button>
        <Button onClick={() => increment()} color="green">
          +
        </Button>
      </div>
    </div>
  );
};

interface ActivePhasesProps {
  character: Character;
}

const ActivePhases = ({ character }: ActivePhasesProps) => {
  const characterHelper = new CharacterHelper(character);
  const phases = characterHelper.getCombatPhases();
  // const phases = character.CHARACTERISTICS.SPD.NOTES.match(/(\d+)/g);
  const dots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    return (
      <div
        key={i}
        className={`text-white rounded-lg p-4 flex-0 text-center w-14 select-none ${
          phases.indexOf(i) > -1 ? "bg-green-500" : "bg-gray-500"
        }`}
      >
        {i}
      </div>
    );
  });

  return (
    <div>
      <div className="font-semibold mb-2">Phases</div>
      <div className="flex flex-wrap gap-2" style={{ maxWidth: "376px" }}>
        {dots}
      </div>
    </div>
  );
};

interface Props {
  character: Character;
  characterRef?: DocumentReference<Character>;
}

export const CombatTracker = ({ character, characterRef }: Props) => {
  return (
    <div className="flex gap-4">
      <ActivePhases character={character}></ActivePhases>

      <div className="flex ml-auto gap-4">
        <ActiveStat
          name={CharacteristicLabel.END}
          stat={character.CHARACTERISTICS.END}
          character={character}
          characterRef={characterRef}
        ></ActiveStat>
        <ActiveStat
          name={CharacteristicLabel.STUN}
          stat={character.CHARACTERISTICS.STUN}
          character={character}
          characterRef={characterRef}
        ></ActiveStat>
        <ActiveStat
          name={CharacteristicLabel.BODY}
          stat={character.CHARACTERISTICS.BODY}
          character={character}
          characterRef={characterRef}
        ></ActiveStat>
      </div>
    </div>
  );
};
