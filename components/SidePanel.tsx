import { useSpring, useTransition, animated, config } from "react-spring";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavArrowLeft } from "iconoir-react";

const MAX_Z = 99999;

interface SidePanelProps {
  handle: JSX.Element;
  children: JSX.Element;
}

let panelCount = 0;
const HANDLE_HEIGHT = 48;
const HANDLE_MARGIN = 16;

export const SidePanel = ({ handle, children }: SidePanelProps) => {
  const [shown, setShown] = useState(false);
  const indexRef = useRef(null);

  useEffect(() => {
    if (!indexRef.current) {
      indexRef.current = panelCount;
    }

    panelCount += 1;

    return () => {
      panelCount -= 1;
    };
  }, []);

  const drawerSpringProps = useSpring({
    right: shown ? 0 : -400,
    config: config.stiff,
  });

  const top =
    indexRef.current != null
      ? indexRef.current * HANDLE_HEIGHT +
        (indexRef.current + 1) * HANDLE_MARGIN
      : HANDLE_MARGIN;

  return (
    <>
      <animated.div
        className="fixed top-0 p-4 h-full bg-gray-50 border-l-2 shadow-lg"
        style={{ ...drawerSpringProps, zIndex: MAX_Z, width: "400px" }}
      >
        {children}
      </animated.div>
      <animated.div
        className="fixed flex cursor-pointer bg-white shadow rounded p-2"
        style={{
          right: drawerSpringProps.right.to((n) => 416 + n),
          zIndex: MAX_Z - 1,
          top: top,
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
        {handle}
      </animated.div>
    </>
  );
};
