import { createContext, useContext, useEffect, useState } from "react";
import type { Campaign } from "../types/Campaign";
import type { Dispatch } from "react";
import {
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { useCurrentCharacter } from "./useCurrentCharacter";

interface CampaignState {
  data?: Campaign;
  ref?: DocumentReference<Campaign>;
}
export const CurrentCampaignContext =
  createContext<[CampaignState, Dispatch<CampaignState>]>(null);

export const useCurrentCampaign = (): [
  CampaignState,
  Dispatch<CampaignState>
] => {
  const [currentCampaign, setCurrentCampaign] = useContext<
    [CampaignState, Dispatch<CampaignState>]
  >(CurrentCampaignContext);

  const [currentCharacter] = useCurrentCharacter();

  useEffect(() => {
    let unsub;
    if (currentCharacter?.data?.campaign) {
      unsub = onSnapshot(currentCharacter.data.campaign, (doc) => {
        setCurrentCampaign({
          data: doc.data(),
          ref: currentCharacter.data.campaign,
        });
      });
    } else {
      setCurrentCampaign({ data: undefined, ref: undefined });
    }

    return unsub;
  }, [currentCharacter]);

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
