import Head from 'next/head'
import { Login } from '../components/Login'
import { CharacterSelect } from '../components/CharacterSelect'
import { useCurrentCharacter } from '../hooks/useCurrentCharacter'
import { CharacterSheet } from '../components/CharacterSheet'
import { FileUploader } from '../components/FileUploader'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { DiceRoller } from '../components/DiceRoller'

export default function Home() {
  const [currentCharInfo] = useCurrentCharacter()
  const character = currentCharInfo?.data
  const characterRef = currentCharInfo?.ref
  const currentUser = useCurrentUser()

  const head = (
    <Head>
      <title>Champions</title>
      <meta name="description" content="Combat tracking for Champions 6E" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )

  const nav = (
    <div>
      <h1 className="text-5xl my-2 mb-4 text-">Champions Tracker</h1>
      <div className="flex gap-4">
        <CharacterSelect></CharacterSelect>
        {currentUser && (
          <FileUploader></FileUploader>
        )}
        <Login></Login>
      </div>
    </div>
  )

  let body

  if (currentUser && character) {
    body = <CharacterSheet character={character} characterRef={characterRef}></CharacterSheet>
  }

  return (
    <div className="container mx-auto px-4 my-4">
      {head}
      {nav}
      <div className="mt-4">
        <DiceRoller></DiceRoller>
      </div>
      {body}
    </div>
  )
}
