import { Button } from "./Button";

const MAX_Z = 999999;

interface Props {
  title: string;
  children?: any;
  onConfirm?: any;
  canConfirm?: boolean;
  onCancel?: any;
  canCancel?: boolean;
}

export const Modal = ({
  title,
  children,
  onConfirm,
  canConfirm = true,
  onCancel,
  canCancel = true,
}: Props) => {
  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-50"
        style={{ zIndex: MAX_Z }}
      ></div>

      <div
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full"
        style={{ zIndex: MAX_Z }}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                {title}
              </h3>
            </div>
            <div className="p-6 space-y-6">{children}</div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {onConfirm && (
                <Button onClick={onConfirm} disabled={!canConfirm}>
                  Go for it
                </Button>
              )}
              {onCancel && (
                <Button onClick={onCancel} color="red">
                  Never mind
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
