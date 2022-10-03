import { useFirebaseApp } from "../hooks/useFirebaseApp";
import {
  getFirestore,
  collection as fs_collection,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { Select } from "./Select";
import type { Character } from "../types/Character";
import type { CollectionReference } from "firebase/firestore";
import { useCurrentCharacter } from "../hooks/useCurrentCharacter";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Button } from "./Button";
import { CharacterLoader } from "./CharacterLoader";

export const CharacterSelect = () => {
  const firebaseApp = useFirebaseApp();
  const firestore = getFirestore(firebaseApp);
  const collection = fs_collection(
    firestore,
    "characters"
  ) as CollectionReference<Character>;
  const currentUser = useCurrentUser();
  const [currentCharInfo, setCurrentChar] = useCurrentCharacter();
  const currentChar = currentCharInfo?.data;
  const currentRef = currentCharInfo?.ref;
  const characters = currentCharInfo?.all || [];

  console.log(characters);

  const charOpts = characters.map((c) => {
    return {
      value: c.data().uid,
      label: c.data().name,
      selected: c.data() === currentChar,
    };
  });

  const onSelectChange = (evt) => {
    const selectedDoc = characters.find(
      (doc) => doc.data().name == evt.target.value
    );

    if (selectedDoc) {
      setCurrentChar((prev) => ({
        ...prev,
        data: { ...selectedDoc.data() },
        ref: selectedDoc.ref,
      }));
    } else {
      setCurrentChar((prev) => ({
        all: prev.all,
      }));
    }
  };

  const deleteCurrentCharacter = async () => {
    if (currentRef) {
      const nextDoc = characters.find((doc) => doc.ref.id != currentRef.id);

      if (nextDoc) {
        setCurrentChar((prev) => ({
          ...prev,
          data: { ...nextDoc.data() },
          ref: nextDoc.ref,
        }));
      } else {
        setCurrentChar((prev) => ({
          all: prev.all,
        }));
      }
      await deleteDoc(currentCharInfo.ref);
    }
  };

  return (
    <>
      <CharacterLoader></CharacterLoader>
      {characters && characters.length > 0 && (
        <>
          <div>
            <Select
              options={charOpts}
              onChange={onSelectChange}
              defaultValue={currentChar?.name}
            ></Select>
          </div>
          <Button color="red" onClick={() => deleteCurrentCharacter()}>
            Delete Current Character
          </Button>
        </>
      )}
    </>
  );
};
