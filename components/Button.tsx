import type { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { useMemo } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: string;
}

export const Button = ({ color = "blue", className = "", ...rest }: Props) => {
  const computedClassName = useMemo(() => {
    return `bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 ${className}`;
  }, [color, className]);

  return <button className={computedClassName} {...rest}></button>;
};
