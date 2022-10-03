import { useEffect, useMemo, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { Character } from "../types/Character";
import { XMLParser } from "fast-xml-parser";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import type { CollectionReference } from "firebase/firestore";
import { useFirebaseApp } from "../hooks/useFirebaseApp";
import { Modal } from "../components/Modal";
import { CharacterIntro } from "./CharacterIntro";
import { useCurrentCharacter } from "../hooks/useCurrentCharacter";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Button } from "./Button";

const EXPORTER_ENDPOINT = process.env.NEXT_PUBLIC_EXPORTER_ENDPOINT;
// const EXPORTER_ENDPOINT = "https://hannahsho.re/api/hd";

export const FileUploader = () => {
  const firebaseApp = useFirebaseApp();
  const currentUser = useCurrentUser();
  const col = collection(
    getFirestore(firebaseApp),
    "characters"
  ) as CollectionReference<Character>;
  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    accept: ".hdc",
  });
  const [_, setCurrentChar] = useCurrentCharacter();
  const [exportedChar, setExportedChar] = useState<string>();
  const [exportLoading, setExportLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!filesContent?.[0]) {
      setExportLoading(false);
      setExportedChar(null);
      return;
    }

    const requestOptions = {
      method: "POST",
      body: filesContent[0].content,
    };

    setExportLoading(true);

    fetch(EXPORTER_ENDPOINT, requestOptions)
      .then((r) => {
        return r.text();
      })
      .then((r) => {
        setExportedChar(r);
      })
      .finally(() => setExportLoading(false));
  }, [filesContent]);

  const characterToAdd: Character = useMemo<Character>(() => {
    if (!exportedChar) {
      return null;
    }

    const parser = new XMLParser();
    let parsedXML = parser.parse(exportedChar);
    return { ...parsedXML.character, author_uid: currentUser.uid };
  }, [, currentUser?.uid, exportedChar]);

  const persistNewCharacter = async () => {
    const newDocRef = await addDoc<Character>(col, { ...characterToAdd });
    setCurrentChar((prev) => ({
      ...prev,
      data: { ...characterToAdd },
      ref: newDocRef,
    }));

    clear();
  };

  const cancelPersist = () => {
    clear();
  };

  return (
    <>
      <Button color="blue" onClick={() => openFileSelector()}>
        Upload XML
      </Button>
      {(characterToAdd || exportLoading) && (
        <Modal
          title={"Confirm Upload"}
          onConfirm={persistNewCharacter}
          onCancel={cancelPersist}
        >
          {characterToAdd ? (
            <CharacterIntro character={characterToAdd}></CharacterIntro>
          ) : (
            <div>Loading</div>
          )}
        </Modal>
      )}
    </>
  );
};
