import { useToasterStore, resolveValue } from "react-hot-toast";
import type { Toast } from "react-hot-toast";
import { useEffect } from "react";
import { renderToString } from "react-dom/server";
import { updateDoc, arrayUnion } from "firebase/firestore";
import { useCurrentCharacter } from "./useCurrentCharacter";
import { useCurrentCampaign } from "./useCurrentCampaign";

const allToasts: Toast[] = [];
const allToastsHTML: string[] = [];

export const useRollHistoryInit = () => {
  const { toasts } = useToasterStore();
  const [currentCharacter] = useCurrentCharacter();
  const [currentCampaign] = useCurrentCampaign();

  useEffect(() => {
    toasts.forEach((toast) => {
      if (!allToasts.find((t) => t.id === toast.id)) {
        allToasts.push(toast);
        allToastsHTML.push(renderToString(resolveValue(toast.message, toast)));
      }
    });
  }, [toasts]);

  useEffect(() => {
    if (
      currentCampaign?.ref &&
      currentCharacter?.ref &&
      toasts.length > 0 &&
      allToastsHTML.length > 0
    ) {
      updateDoc(currentCampaign.ref, {
        rollHistory: arrayUnion({
          character: currentCharacter.ref,
          toastMarkup: allToastsHTML[allToastsHTML.length - 1],
          id: `${allToasts[allToasts.length - 1].createdAt}-${
            currentCharacter.data.name
          }`,
        }),
      });
    }
  }, [toasts, currentCharacter, currentCampaign]);
};
