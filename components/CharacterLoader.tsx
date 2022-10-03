import { useFirebaseApp } from "../hooks/useFirebaseApp";
import {
  getFirestore,
  collection as fs_collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import type { Character } from "../types/Character";
import type { CollectionReference } from "firebase/firestore";
import {
  CharacterState,
  useCurrentCharacter,
} from "../hooks/useCurrentCharacter";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { rootService } from "../hooks/useAppStateMachine";

export const CharacterLoader = () => {
  const firebaseApp = useFirebaseApp();
  const firestore = getFirestore(firebaseApp);
  const collection = fs_collection(
    firestore,
    "characters"
  ) as CollectionReference<Character>;
  const currentUser = useCurrentUser();
  const [currentCharInfo, setCurrentChar] = useCurrentCharacter();
  const currentChar = currentCharInfo?.data;

  const q = query<Character>(
    collection,
    where("author_uid", "==", currentUser?.uid || "NA"),
    orderBy("name", "asc")
  );

  const [characters, loading, error, snapshot] = useCollectionData(q);

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (loading) {
      return;
    }

    setCurrentChar((prev: CharacterState) => ({ ...prev, all: snapshot.docs }));

    if (characters.length === 0) {
      rootService.send("NO_CHARACTERS_FOUND");
    } else {
      rootService.send("CHARACTERS_LOADED");
    }
  }, [loading, characters, setCurrentChar]);

  useEffect(() => {
    if (snapshot?.docs?.[0] && !currentChar) {
      setCurrentChar((prev) => ({
        ...prev,
        data: { ...snapshot.docs[0].data() },
        ref: snapshot.docs[0].ref,
        all: snapshot.docs,
      }));
    }
  }, [snapshot?.docs, currentChar, setCurrentChar]);

  return <></>;
};
