import Head from 'next/head'
import { Login } from '../components/Login'
import { CharacterSelect } from '../components/CharacterSelect'
import { useCurrentCharacter } from '../hooks/useCurrentCharacter'
import { useMemo } from 'react'
import { CharacterSheet } from '../components/CharacterSheet'

export default function Home() {
  const [character, setCharacter] = useCurrentCharacter()

  const head = useMemo(() => {
    <Head>
      <title>Champions</title>
      <meta name="description" content="Combat tracking for Champions 6E" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  }, [])

  const nav = useMemo(() => {
    return (
      <CharacterSelect></CharacterSelect>
    )
  }, [])

  const body = useMemo(() => {
    if (!character) {
      return (
        <Login></Login>
      )
    } else {
      return <CharacterSheet character={character}></CharacterSheet>
    }
  }, [character])

  return (
    <div className="container mx-auto my-4">
      {head}
      {nav}
      {body}
    </div>
  )
}
