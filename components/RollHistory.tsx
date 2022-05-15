import { resolveValue } from "react-hot-toast";
import { useTransition, animated, config } from "react-spring";
import { useMemo } from "react";
import { DiceRoller } from "./DiceRoller";
import { HexagonDice } from "iconoir-react";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
import { SidePanel } from "./SidePanel";

const MAX_Z = 99999;

interface HistoryItemProps {
  toast?: any;
  html?: string;
  name?: string;
}

const Badge = ({ name }: HistoryItemProps) => {
  return (
    <div
      className="flex justify-end italic uppercase"
      style={{ top: -16, left: -16 }}
    >
      {name}
    </div>
  );
};

const Message = ({ toast, html, name }: HistoryItemProps) => {
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

const HistoryItem = ({ toast, html, name }: HistoryItemProps) => {
  return (
    <>
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
        <div className="flex flex-col w-full">
          <Message toast={toast} html={html} name={name}></Message>
          <Badge name={name}></Badge>
        </div>
      </div>
    </>
  );
};

interface Props {}

export const RollHistory = ({}: Props) => {
  const refMap = useMemo(() => new WeakMap(), []);
  const [currentCampaign] = useCurrentCampaign();

  const toastsReversed = useMemo(() => {
    return currentCampaign?.data?.rollHistory?.reverse() || [];
  }, [currentCampaign?.data?.rollHistory]);

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

  const showName = useMemo(() => {
    return currentCampaign?.data?.characters?.length > 1;
  }, [currentCampaign]);

  const handle = <HexagonDice width={32} height={32}></HexagonDice>;

  return (
    <SidePanel handle={handle}>
      <div className="flex flex-col gap-2 h-full">
        <DiceRoller></DiceRoller>
        <div className="flex-none">
          <div className="text-lg font-bold">History</div>
          <hr className="border-t-2 border-black"></hr>
        </div>
        <div className="flex gap-4 flex-col p-2 overflow-y-auto h-full no-scroll scroll-smooth">
          {transitions((style, item, _, i) => (
            <animated.div style={{ ...style }}>
              <div ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}>
                <HistoryItem
                  html={item.toastMarkup}
                  name={showName ? item.characterName : undefined}
                ></HistoryItem>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    </SidePanel>
  );
};
