import { Button } from "./Button";
import type { ButtonProps } from "./Button";

export const RollButton = ({ className, ...rest }: ButtonProps) => {
  return (
    <Button
      className={`bg-white hover:bg-white flex items-center text-black font-normal gap-x-2 rounded border-gray-100 hover:border-gray-300 border-2 ${className}`}
      {...rest}
    ></Button>
  );
};
