import { useToasterStore, resolveValue, ToastBar } from "react-hot-toast";
import type { Toast } from "react-hot-toast";
import { useEffect } from "react";

const allToasts: Toast[] = [];

export const useRollHistory = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts.forEach((toast) => {
      if (!allToasts.find((t) => t.id === toast.id)) {
        allToasts.push(toast);
      }
    });
  }, [toasts]);

  return [...allToasts];
};
