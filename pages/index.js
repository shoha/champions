import Head from 'next/head'
import xml from '../public/isolde.xml'
import { Characteristics } from '../components/Characteristics'
import { Experience } from '../components/Experience'
import { Movement } from '../components/Movement'
import { MartialArts } from '../components/MartialArts'
import { Defenses } from '../components/Defenses'
import { Section } from '../components/Section'
import { CombatInfo } from '../components/CombatInfo'
import { Powers } from '../components/Powers'
import { Skills } from '../components/Skills'
import { Talents } from '../components/Talents'
import { CombatManeuvers } from '../components/CombatManeuvers'
import { CombatModifiers } from '../components/CombatModifiers'
import { Disadvantages } from '../components/Disadvantages'
import { Appearance } from '../components/Appearance'
import { XMLParser } from 'fast-xml-parser'

export default function Home() {
  const parser = new XMLParser()
  let parsedXML = parser.parse(xml)
  const character = parsedXML.character
  console.log(parsedXML)

  return (
    <div>
      <Head>
        <title>Champions</title>
        <meta name="description" content="Combat tracking for Champions 6E" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto my-4">
        <h1 className="text-5xl my-2 text-">Champions Tracker</h1>
        <h2 className="text-3xl italic my-2">{character.name}</h2>
        <h2 className="text-2xl italic my-2">{character.campaign_name} by {character.gm}</h2>
        <hr className="border-t-4 border-black my-4"></hr>

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

        <Section className="mb-4 mt-4" title="Martial Arts Maneuvers">
          <MartialArts character={character}></MartialArts>
        </Section>

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

        <Section className="mb-4 mt-4" title="Powers">
          <Powers character={character}></Powers>
        </Section>

        {/*
          Skills, Perks, Talents & Disadvantages Page
        */}

        <Section className="mb-4 mt-4" title="Skills">
          <Skills character={character}></Skills>
        </Section>

        <Section className="mb-4 mt-4" title="Talents">
          <Talents character={character}></Talents>
        </Section>

        <Section className="mb-4 mt-4" title="Disadvantages">
          <Disadvantages character={character}></Disadvantages>
        </Section>

      </div>
    </div>
  )
}
