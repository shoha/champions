import { resolveValue } from "react-hot-toast";
import { useToastHistory } from "../hooks/useToastHistory";
import { useSpring, useTransition, animated, config } from "react-spring";
import { useMemo } from "react";

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

interface Props {
  shown: boolean;
}

export const RollHistory = ({ shown }: Props) => {
  const refMap = useMemo(() => new WeakMap(), []);
  const toasts = useToastHistory();
  const toastsReversed = useMemo(() => {
    return [...toasts].reverse();
  }, [toasts]);

  const drawerSpringProps = useSpring({
    right: shown ? 0 : -200,
    config: config.stiff,
  });

  const transitions = useTransition(toastsReversed, {
    from: { opacity: 0, height: 0 },
    enter: (item) => async (next) => {
      await next({ opacity: 1, height: refMap.get(item).offsetHeight });
    },
    leave: { opacity: 0 },
    update: { opacity: 1 },
    config: config.stiff,
    keys: (item) => {
      return item.id;
    },
  });

  return (
    <animated.div
      className="fixed top-0 p-4 h-full bg-gray-50 w-52 border-l-2 shadow-lg"
      style={{ ...drawerSpringProps }}
    >
      <div className="mt-2 text-lg font-bold">History</div>
      <hr className="border-t-2 border-black"></hr>
      <div className="mt-2 flex gap-2 flex-col">
        {transitions((style, item) => (
          <animated.div style={{ ...style }}>
            <div ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}>
              <HistoryItem toast={item}></HistoryItem>
            </div>
          </animated.div>
        ))}
      </div>
    </animated.div>
  );
};