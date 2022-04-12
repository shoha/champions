import { useFirebaseApp } from '../hooks/useFirebaseApp'
import { getFirestore, collection as fs_collection, addDoc, deleteDoc, query, where, doc, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect } from 'react';
import { Select } from './Select'
import type { Character } from '../types/Character';
import type { CollectionReference } from 'firebase/firestore';
import { useCurrentCharacter } from '../hooks/useCurrentCharacter';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { Button } from './Button';

export const CharacterSelect = () => {
  const firebaseApp = useFirebaseApp()
  const firestore = getFirestore(firebaseApp)
  const collection = fs_collection(firestore, 'characters') as CollectionReference<Character>
  const currentUser = useCurrentUser()
  const [currentCharInfo, setCurrentChar] = useCurrentCharacter()
  const currentChar = currentCharInfo?.data
  const currentRef = currentCharInfo?.ref

  const q = query<Character>(collection, where("author_uid", "==", currentUser?.uid || "NA"), orderBy("name", "asc"))

  const [characters, loading, error, snapshot] = useCollectionData(
    q,
  );

  if (error) {
    throw error
  }

  useEffect(() => {
    if (snapshot?.docs?.[0] && !currentChar) {
      setCurrentChar({ data: { ...snapshot.docs[0].data() }, ref: snapshot.docs[0].ref })
    }
  }, [snapshot?.docs, currentChar, setCurrentChar])

  const charOpts = characters?.map((c) => {
    return {
      value: c.uid,
      label: c.name,
      selected: c === currentChar
    }
  })

  const onSelectChange = (evt) => {
    const selectedDoc = snapshot.docs.find((doc) => doc.data().name == evt.target.value)
    if (selectedDoc) {
      setCurrentChar({ data: { ...selectedDoc.data() }, ref: selectedDoc.ref })
    } else {
      setCurrentChar({})
    }
  }

  const deleteCurrentCharacter = async () => {
    if (currentRef) {
      const nextDoc = snapshot.docs.find((doc) => doc.ref.id != currentRef.id)
      if (nextDoc) {
        setCurrentChar({ data: { ...nextDoc.data() }, ref: nextDoc.ref })
      } else {
        setCurrentChar({})
      }
      await deleteDoc(currentCharInfo.ref)
    }
  }

  return (
    <>
      {characters && characters.length > 0 && (
        <>
          <div>
            <Select options={charOpts} onChange={onSelectChange} defaultValue={currentChar?.name}></Select>
          </div>
          <Button color="red" onClick={() => deleteCurrentCharacter()}>Delete Current Character</Button>
        </>
      )
      }
    </>
  )
}
