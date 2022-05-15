import { WhiteFlag } from "iconoir-react";
import { useCallback, useState } from "react";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
import { Button } from "./Button";
import { SidePanel } from "./SidePanel";
import { CreateCampaignModal } from "./CreateCampaignModal";
import { JoinCampaignModal } from "./JoinCampaignModal";
import { CampaignCharacters } from "./CampaignCharacters";

export const CampaignInfo = () => {
  const [currentCampaign] = useCurrentCampaign();
  const handle = <WhiteFlag width={32} height={32}></WhiteFlag>;
  const inCampaign = currentCampaign?.data?.public;
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);

  const createCampaign = useCallback(() => {
    setShowCreateModal(true);
  }, [setShowCreateModal]);

  const joinCampaign = useCallback(() => {
    setShowJoinModal(true);
  }, [setShowJoinModal]);

  const emptyState = (
    <>
      <div className="text-lg font-bold">Campaign</div>
      <hr className="border-t-2 border-black"></hr>
      <div>You are not currently in a campaign.</div>
      <div className="flex gap-2">
        <Button color="green" className="flex-1" onClick={createCampaign}>
          Create one!
        </Button>
        <Button color="blue" className="flex-1" onClick={joinCampaign}>
          Join one!
        </Button>
      </div>
    </>
  );

  return (
    <>
      <SidePanel handle={handle}>
        <div className="flex flex-col gap-2 h-full">
          {inCampaign ? (
            <>
              <div className="text-lg font-bold">
                Campaign: {currentCampaign?.data?.name}
              </div>
              <hr className="border-t-2 border-black"></hr>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="block w-full"
                  disabled
                  value={currentCampaign?.ref?.id || ""}
                />
                <Button
                  onClick={(evt) => {
                    navigator.clipboard.writeText(currentCampaign?.ref?.id);
                  }}
                  color="blue"
                >
                  Copy invite code
                </Button>
                <CampaignCharacters></CampaignCharacters>
              </div>
            </>
          ) : (
            emptyState
          )}
        </div>
      </SidePanel>
      {showCreateModal && (
        <CreateCampaignModal
          setShown={setShowCreateModal}
        ></CreateCampaignModal>
      )}

      {showJoinModal && (
        <JoinCampaignModal setShown={setShowJoinModal}></JoinCampaignModal>
      )}
    </>
  );
};
