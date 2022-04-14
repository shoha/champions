import { resolveValue } from "react-hot-toast";
import { useRollHistory } from "../hooks/useRollHistory";
import { useSpring, useTransition, animated, config } from 'react-spring'
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
  shown: boolean
}

export const RollHistory = ({ shown }: Props) => {
  const toasts = useRollHistory();
  const toastsReversed = useMemo(() => {
    return [...toasts].reverse()
  }, [toasts])

  const drawerSpringProps = useSpring({
    right: shown ? 0 : -200,
    config: config.stiff
  })

  const transitions = useTransition(toastsReversed, {
    from: { opacity: 0, y: 0 },
    enter: { opacity: 1, y: 10 },
    leave: { opacity: 0, y: -10 },
    update: { opacity: 1, y: 10 },
    delay: 100,
    config: config.stiff,
  })


  return (
    <animated.div className="fixed top-0 p-4 h-full bg-gray-50 w-52 border-l-2 shadow-lg" style={{ ...drawerSpringProps }}>
      <div className="mt-2 text-lg font-bold">History</div>
      <hr className="border-t-2 border-black"></hr>
      <div className="mt-2 flex gap-2 flex-col">
        {transitions((style, item) => (
          <animated.div style={{ ...style, transform: style.y.to((y) => `translate3d(0,${style.y.get()}px,0)`) }}>
            <HistoryItem toast={item}></HistoryItem>
          </animated.div>
        ))}
      </div>
    </animated.div >
  );
};
