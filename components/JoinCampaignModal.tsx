import { useCallback, useMemo, useRef, useState } from "react";
import { Modal } from "./Modal";
import {
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { useCurrentCharacter } from "../hooks/useCurrentCharacter";
import { useFirebaseApp } from "../hooks/useFirebaseApp";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface CreateCampaignModalProps {
  setShown: (state: boolean) => void;
}

enum FormNames {
  Id = "id",
}

type FormState = {
  [key in FormNames]?: string;
};

let createPromise = null;

export const JoinCampaignModal = ({ setShown }: CreateCampaignModalProps) => {
  const [campaignInfo, setCampaignInfo] = useState<FormState>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef(null);

  const [currentCharacter] = useCurrentCharacter();
  const currentUser = useCurrentUser();
  const firebaseApp = useFirebaseApp();

  const canConfirm = useMemo(() => {
    return campaignInfo && !loading && !!formRef?.current?.checkValidity();
  }, [formRef, campaignInfo, loading]);

  const onChange = useCallback(
    (evt) => {
      if (Object.values(FormNames).includes(evt.target.name)) {
        setCampaignInfo({
          ...campaignInfo,
          [evt.target.name]: evt.target.value,
        });
      }
    },
    [setCampaignInfo, campaignInfo]
  );

  const createModalConfirm = useCallback(() => {
    if (!canConfirm) {
      return;
    }

    setLoading(true);

    const persistNewCampaign = async () => {
      const newCampaignRef = doc(
        getFirestore(firebaseApp),
        "campaigns",
        campaignInfo.id
      );

      const oldCampaignRef = currentCharacter?.data?.campaign;

      await updateDoc(newCampaignRef, {
        characters: arrayUnion(currentCharacter.ref),
        users: arrayUnion(currentUser.uid),
      });

      await updateDoc(currentCharacter.ref, { campaign: newCampaignRef });

      if (oldCampaignRef) {
        await deleteDoc(oldCampaignRef);
      }

      createPromise = null;
      setLoading(false);
    };

    persistNewCampaign();

    setShown(false);
  }, [
    setShown,
    campaignInfo,
    currentCharacter?.ref,
    currentCharacter?.data?.campaign,
    currentUser?.uid,
    firebaseApp,
    canConfirm,
  ]);

  const createModalCancel = useCallback(() => {
    setShown(false);
  }, [setShown]);

  return (
    <Modal
      onConfirm={createModalConfirm}
      canConfirm={canConfirm}
      onCancel={createModalCancel}
      title="Join an existing campaign?"
    >
      <form onSubmit={createModalConfirm} ref={formRef}>
        <label className="flex flex-col gap-2">
          <div>
            Campaign code{" "}
            <span className="text-xs italic text-red-500">required</span>
          </div>
          <input
            type="text"
            className="block w-full"
            name={FormNames.Id}
            value={campaignInfo.id || ""}
            onChange={onChange}
            required
          />
        </label>
      </form>
    </Modal>
  );
};
