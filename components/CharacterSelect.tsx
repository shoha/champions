import { useFirebaseApp } from '../hooks/useFirebaseApp'
import { getFirestore, collection as fs_collection, addDoc, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useCallback, useEffect } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { Select } from './Select'
import type { Character } from '../types/Character';
import type { CollectionReference } from 'firebase/firestore';
import { useCurrentCharacter } from '../hooks/useCurrentCharacter';

export const CharacterSelect = () => {
  const firebaseApp = useFirebaseApp()
  const firestore = getFirestore(firebaseApp)
  const collection = fs_collection(firestore, 'characters') as CollectionReference<Character>
  const firebaseAuth = useFirebaseAuth()
  const [currentChar, setCurrentChar] = useCurrentCharacter()

  const q = query<Character>(collection, where("author_uid", "==", firebaseAuth?.currentUser?.uid || "NA"))

  const [characters, loading, error] = useCollectionData(
    q,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (characters && characters[0] && !currentChar) {
      setCurrentChar(characters[0])
    }
  }, [characters, currentChar, setCurrentChar])

  const charOpts = characters?.map((c) => {
    return {
      value: c.uid,
      label: c.name
    }
  })

  const onSelectChange = useCallback((evt) => {
    const selectedChar = characters.find((c) => c.name = evt.target.value)
    setCurrentChar(selectedChar)
  }, [setCurrentChar, characters])

  return (
    <>
      {characters && (
        <div>
          <Select options={charOpts} onChange={onSelectChange}></Select>
        </div>
      )}
    </>
  )
}
