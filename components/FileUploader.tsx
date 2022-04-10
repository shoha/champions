import { useMemo } from 'react';
import { useFilePicker } from 'use-file-picker';
import { Character } from '../types/Character';
import { XMLParser } from 'fast-xml-parser'
import { getFirestore, collection, addDoc, } from 'firebase/firestore';
import type { CollectionReference } from 'firebase/firestore'
import { useFirebaseApp } from '../hooks/useFirebaseApp'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { Modal } from '../components/Modal'
import { CharacterIntro } from './CharacterIntro';

export const FileUploader = () => {
  const firebaseApp = useFirebaseApp()
  const firebaseAuth = useFirebaseAuth()
  const col = collection(getFirestore(firebaseApp), "characters") as CollectionReference<Character>
  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    accept: '.xml',
  });

  const characterToAdd: Character = useMemo<Character>(() => {
    if (!filesContent?.[0]) {
      return null
    }

    const parser = new XMLParser()
    let parsedXML = parser.parse(filesContent[0].content)
    return { ...parsedXML.character, author_uid: firebaseAuth.currentUser.uid }
  }, [filesContent, firebaseAuth?.currentUser?.uid])

  const persistNewCharacter = () => {
    addDoc<Character>(col, { ...characterToAdd })
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
