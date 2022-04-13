import { resolveValue } from "react-hot-toast";
import { useRollHistory } from "../hooks/useRollHistory";

const Message = ({ toast }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "4px 10px",
        color: "inherit",
        flex: "1 1 auto",
        whiteSpace: "pre-line",
      }}
    >
      {resolveValue(toast.message, toast)}
    </div>
  );
};

const HistoryItem = ({ toast }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        color: "#363636",
        lineHeight: "1.3",
        willChange: "transform",
        boxShadow:
          "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)",
        maxWidth: "350px",
        pointerEvents: "auto",
        padding: "8px 10px",
        borderRadius: "8px",
      }}
    >
      <Message toast={toast}></Message>
    </div>
  );
};

export const RollHistory = () => {
  const toasts = useRollHistory();

  return (
    <div className="fixed top-0 right-0 p-4 h-full bg-gray-50 w-52 border-l-2 shadow-lg">
      <div className="mt-2 text-lg font-bold">History</div>
      <hr className="border-t-2 border-black"></hr>
      <div className="mt-2 flex gap-2 flex-col">
        {[...toasts].reverse().map((t, i) => (
          <HistoryItem key={i} toast={t}></HistoryItem>
        ))}
      </div>
    </div>
  );
};
