import Head from 'next/head'
import xml from '../public/isolde.xml'
import { Characteristics } from '../components/Characteristics'
import { Experience } from '../components/Experience'
import { Section } from '../components/Section'
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

        <Section className="mb-2 mt-4" title="Characteristics">
          <Characteristics character={character}></Characteristics>
        </Section>

        <Section className="mb-2 mt-4" title="Experience">
          <Experience character={character}></ Experience>
        </Section>
      </div>
    </div>
  )
}
