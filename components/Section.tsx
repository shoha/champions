import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  title: string;
  children: any;
  className: string;
}

export const Section = ({ title, children, className }: Props) => {
  const fallbackRender = useMemo(() => {
    const FallbackRender = ({ error }) => (
      <div className={className}>
        <h3 className="text-xl uppercase">{title}</h3>
        <hr className="border-t-2 border-gray-400 my-2"></hr>
        <div className="p-2 bg-white border-red-400 border-2 rounded shadow-inner text-md font-semibold">
          Encountered an error when rendering component:
          <pre className="font-mono  bg-gray-50 shadow-inner text-black p-3 mt-2 font-normal">
            {error.message}
            {error.stack}
          </pre>
        </div>
      </div>
    );

    return FallbackRender;
  }, [title, className]);

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <div className={className}>
        <h3 className="text-xl uppercase">{title}</h3>
        <hr className="border-t-2 border-gray-400 my-2"></hr>
        {children}
      </div>
    </ErrorBoundary>
  );
};
