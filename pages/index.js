import Head from 'next/head'
import { Login } from '../components/Login'
import { CharacterSelect } from '../components/CharacterSelect'
import { useCurrentCharacter } from '../hooks/useCurrentCharacter'
import { CharacterSheet } from '../components/CharacterSheet'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

export default function Home() {
  const [character] = useCurrentCharacter()
  const firebaseAuth = useFirebaseAuth()

  const head = (
    <Head>
      <title>Champions</title>
      <meta name="description" content="Combat tracking for Champions 6E" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )

  const nav = (
    <CharacterSelect></CharacterSelect>
  )

  let body

  if (!firebaseAuth.currentUser) {
    body = (
      <Login></Login>
    )
  } else if (character) {
    body = <CharacterSheet character={character}></CharacterSheet>
  } else {
    body = <div>No character available</div>
  }

  return (
    <div className="container mx-auto px-4 my-4">
      {head}
      {nav}
      {body}
    </div>
  )
}
