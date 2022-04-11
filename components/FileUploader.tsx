import { useMemo } from 'react';
import { useFilePicker } from 'use-file-picker';
import { Character } from '../types/Character';
import { XMLParser } from 'fast-xml-parser'
import { getFirestore, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import type { CollectionReference } from 'firebase/firestore'
import { useFirebaseApp } from '../hooks/useFirebaseApp'
import { Modal } from '../components/Modal'
import { CharacterIntro } from './CharacterIntro';
import { useCurrentCharacter } from '../hooks/useCurrentCharacter';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const FileUploader = () => {
  const firebaseApp = useFirebaseApp()
  const currentUser = useCurrentUser()
  const col = collection(getFirestore(firebaseApp), "characters") as CollectionReference<Character>
  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    accept: '.xml',
  });
  const [_, setCurrentChar] = useCurrentCharacter()

  const characterToAdd: Character = useMemo<Character>(() => {
    if (!filesContent?.[0]) {
      return null
    }

    const parser = new XMLParser()
    let parsedXML = parser.parse(filesContent[0].content)
    return { ...parsedXML.character, author_uid: currentUser.uid }
  }, [filesContent, currentUser?.uid])

  const persistNewCharacter = async () => {
    const newDocRef = await addDoc<Character>(col, { ...characterToAdd })
    setCurrentChar({ data: { ...characterToAdd }, ref: newDocRef })

    clear()
  }

  const cancelPersist = () => {
    clear()
  }

  return (
    <>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4' onClick={() => openFileSelector()}>Upload XML</button>
      {characterToAdd && (
        <Modal title={"Confirm Upload"} onConfirm={persistNewCharacter} onCancel={cancelPersist}>
          <CharacterIntro character={characterToAdd}></CharacterIntro>
        </Modal>
      )}
    </>
  )
}
