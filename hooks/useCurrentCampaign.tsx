import { createContext, useContext, useEffect, useState } from "react";
import type { Campaign } from "../types/Campaign";
import type { Dispatch } from "react";
import {
  DocumentReference,
  CollectionReference,
  onSnapshot,
  addDoc,
  getFirestore,
  collection,
  updateDoc,
  Unsubscribe,
} from "firebase/firestore";
import { useCurrentCharacter } from "./useCurrentCharacter";
import { useFirebaseApp } from "../hooks/useFirebaseApp";
import { useCurrentUser } from "./useCurrentUser";

interface CampaignState {
  data?: Campaign;
  ref?: DocumentReference<Campaign>;
}
export const CurrentCampaignContext =
  createContext<[CampaignState, Dispatch<CampaignState>]>(null);

let createPromise = null;

export const useCurrentCampaign = (): [
  CampaignState,
  Dispatch<CampaignState>
] => {
  const [currentCampaign, setCurrentCampaign] = useContext<
    [CampaignState, Dispatch<CampaignState>]
  >(CurrentCampaignContext);

  const [currentCharacter] = useCurrentCharacter();
  const currentUser = useCurrentUser();
  const firebaseApp = useFirebaseApp();

  useEffect(() => {
    if (!currentCharacter || currentCampaign) {
      return;
    }
    const snapback = (doc) => {
      setCurrentCampaign({
        data: doc.data(),
        ref: currentCharacter.data.campaign,
      });
    };

    let unsub: Unsubscribe;

    if (currentCharacter?.data?.campaign) {
      unsub = onSnapshot(currentCharacter.data.campaign, snapback);
    } else {
      if (createPromise) {
        return;
      }

      setCurrentCampaign({ data: undefined, ref: undefined });

      const persistNewCampaign = async () => {
        const col = collection(
          getFirestore(firebaseApp),
          "campaigns"
        ) as CollectionReference<Campaign>;

        createPromise = addDoc<Campaign>(col, {
          name: currentCharacter.data.name,
          characters: [currentCharacter.ref],
          users: [currentUser.uid],
          admin: currentUser.uid,
          public: false,
        });

        const newDocRef = await createPromise;
        await updateDoc(currentCharacter.ref, { campaign: newDocRef });

        unsub = onSnapshot(newDocRef, snapback);

        createPromise = null;
      };

      persistNewCampaign();
    }

    return unsub;
  }, [currentCharacter, firebaseApp]);

  return [currentCampaign, setCurrentCampaign];
};

export const CurrentCampaignProvider = ({ children }) => {
  const [currentCampaign, setCurrentCampaign]: [
    CampaignState,
    Dispatch<CampaignState>
  ] = useState<CampaignState>(null);

  return (
    <CurrentCampaignContext.Provider
      value={[currentCampaign, setCurrentCampaign]}
    >
      {children}
    </CurrentCampaignContext.Provider>
  );
};
