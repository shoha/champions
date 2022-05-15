import type { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { useMemo } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: string;
}

export const Button = ({
  color = "blue",
  className = "",
  ...rest
}: ButtonProps) => {
  const computedClassName = useMemo(() => {
    return `bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 transition-all ${className} active:shadow-inner active:scale-95 disabled:opacity-75 disabled:pointer-events-none disabled:bg-gray-500`;
  }, [color, className]);

  return <button className={computedClassName} {...rest}></button>;
};
