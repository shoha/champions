import { Characteristics } from "../components/Characteristics";
import { Experience } from "../components/Experience";
import { Movement } from "../components/Movement";
import { MartialArts } from "../components/MartialArts";
import { Defenses } from "../components/Defenses";
import { Section } from "../components/Section";
import { CombatInfo } from "../components/CombatInfo";
import { Powers } from "../components/Powers";
import { Skills } from "../components/Skills";
import { Talents } from "../components/Talents";
import { CombatManeuvers } from "../components/CombatManeuvers";
import { CombatModifiers } from "../components/CombatModifiers";
import { Disadvantages } from "../components/Disadvantages";
import { Appearance } from "../components/Appearance";
import type { Character } from "../types/Character";
import { CharacterIntro } from "../components/CharacterIntro";
import { CombatTracker } from "../components/CombatTracker";
import type { DocumentReference } from "firebase/firestore";

interface Props {
  character: Character;
  characterRef?: DocumentReference<Character>;
}

export const CharacterSheet = ({ character, characterRef }: Props) => {
  return (
    <div>
      <CharacterIntro character={character}></CharacterIntro>
      <hr className="border-t-4 border-black my-4"></hr>

      <Section className="mb-4 mt-4" title="Combat Tracker">
        <CombatTracker
          character={character}
          characterRef={characterRef}
        ></CombatTracker>
      </Section>

      {/*
          Characteristics and Appearance Page
        */}

      <Section className="mb-4 mt-4" title="Characteristics">
        <Characteristics character={character}></Characteristics>
      </Section>

      <Section className="mb-4 mt-4" title="Experience">
        <Experience character={character}></Experience>
      </Section>

      <Section className="mb-4 mt-4" title="Movement">
        <Movement character={character}></Movement>
      </Section>

      <Section className="mb-4 mt-4" title="Appearance">
        <Appearance character={character}></Appearance>
      </Section>

      {/*
          Combat Information Page
        */}

      {/* <Section className="mb-4 mt-4" title="Martial Arts Maneuvers">
        <MartialArts character={character}></MartialArts>
      </Section> */}

      <Section className="mb-4 mt-4" title="Defenses">
        <Defenses character={character}></Defenses>
      </Section>

      <Section className="mb-4 mt-4" title="Combat Information">
        <CombatInfo character={character}></CombatInfo>
      </Section>

      <Section className="mb-4 mt-4" title="Combat Maneuvers">
        <CombatManeuvers character={character}></CombatManeuvers>
      </Section>

      <Section className="mb-4 mt-4" title="Combat Modifiers">
        <CombatModifiers character={character}></CombatModifiers>
      </Section>

      {/*
          Powers and Equipment Page
        */}

      {/* <Section className="mb-4 mt-4" title="Powers">
        <Powers character={character}></Powers>
      </Section> */}

      {/*
          Skills, Perks, Talents & Disadvantages Page
        */}

      <Section className="mb-4 mt-4" title="Skills">
        <Skills character={character}></Skills>
      </Section>

      {/* <Section className="mb-4 mt-4" title="Talents">
        <Talents character={character}></Talents>
      </Section> */}

      {/* <Section className="mb-4 mt-4" title="Disadvantages">
        <Disadvantages character={character}></Disadvantages>
      </Section> */}
    </div>
  );
};
