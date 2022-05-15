import { resolveValue } from "react-hot-toast";
import { useSpring, useTransition, animated, config } from "react-spring";
import { useMemo, useState } from "react";
import { DiceRoller } from "./DiceRoller";
import { HexagonDice, NavArrowLeft } from "iconoir-react";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";

const MAX_Z = 99999;

interface HistoryItemProps {
  toast?: any;
  html?: string;
}

const Message = ({ toast, html }: HistoryItemProps) => {
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
      <div
        className="flex-grow-0 flex-shrink-0 basis-full"
        dangerouslySetInnerHTML={html && { __html: html }}
      >
        {toast && resolveValue(toast.message, toast)}
      </div>
    </div>
  );
};

const HistoryItem = ({ toast, html }: HistoryItemProps) => {
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
      <Message toast={toast} html={html}></Message>
    </div>
  );
};

interface Props {}

export const RollHistory = ({}: Props) => {
  const [shown, setShown] = useState(false);
  const refMap = useMemo(() => new WeakMap(), []);
  const [currentCampaign] = useCurrentCampaign();

  const toastsReversed = useMemo(() => {
    return currentCampaign?.data?.rollHistory?.reverse() || [];
  }, [currentCampaign?.data?.rollHistory]);

  const drawerSpringProps = useSpring({
    right: shown ? 0 : -400,
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
    <>
      <animated.div
        className="fixed top-0 p-4 h-full bg-gray-50 border-l-2 shadow-lg"
        style={{ ...drawerSpringProps, zIndex: MAX_Z, width: "400px" }}
      >
        <div className="flex flex-col gap-2 h-full">
          <DiceRoller></DiceRoller>
          <div className="flex-none">
            <div className="text-lg font-bold">History</div>
            <hr className="border-t-2 border-black"></hr>
          </div>
          <div className="flex gap-2 flex-col p-2 overflow-y-auto h-full no-scroll scroll-smooth">
            {transitions((style, item, _, i) => (
              <animated.div style={{ ...style }}>
                <div
                  ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
                >
                  <HistoryItem html={item.toastMarkup}></HistoryItem>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </animated.div>
      <animated.div
        className="fixed top-4 flex cursor-pointer bg-white shadow rounded p-2"
        style={{
          right: drawerSpringProps.right.to((n) => 416 + n),
          zIndex: MAX_Z,
        }}
        onClick={() => setShown(!shown)}
      >
        <animated.div
          style={{
            transform: drawerSpringProps.right.to((n) => {
              return `rotate(${(1 - n / 400) * 180}deg)`;
            }),
          }}
        >
          <NavArrowLeft width={32} height={32}></NavArrowLeft>
        </animated.div>
        <HexagonDice width={32} height={32}></HexagonDice>
      </animated.div>
    </>
  );
};
