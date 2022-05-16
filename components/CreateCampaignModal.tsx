import { useCallback, useMemo, useRef, useState } from "react";
import { Modal } from "./Modal";
import {
  CollectionReference,
  addDoc,
  getFirestore,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useCurrentCharacter } from "../hooks/useCurrentCharacter";
import { useFirebaseApp } from "../hooks/useFirebaseApp";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { Campaign } from "../types/Campaign";

interface CreateCampaignModalProps {
  setShown: (state: boolean) => void;
}

enum FormNames {
  Name = "name",
  GM = "gm",
}

type FormState = {
  [key in FormNames]?: string;
};

let createPromise = null;

export const CreateCampaignModal = ({ setShown }: CreateCampaignModalProps) => {
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
      const col = collection(
        getFirestore(firebaseApp),
        "campaigns"
      ) as CollectionReference<Campaign>;

      createPromise = addDoc<Campaign>(col, {
        name: campaignInfo.name,
        characters: [currentCharacter.ref],
        users: [currentUser.uid],
        admin: currentUser.uid,
        public: true,
      });

      const newCampaignRef = await createPromise;

      const oldCampaignRef = currentCharacter?.data?.campaign;

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
      title="Create a new campaign?"
    >
      <form onSubmit={createModalConfirm} ref={formRef}>
        <label className="flex flex-col gap-2">
          <div>
            Name <span className="text-xs italic text-red-500">required</span>
          </div>
          <input
            type="text"
            className="block w-full"
            name={FormNames.Name}
            value={campaignInfo.name || ""}
            onChange={onChange}
            required
          />
        </label>
      </form>
    </Modal>
  );
};
