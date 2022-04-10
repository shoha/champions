interface Props {
  title: string;
  children?: any;
  onConfirm?: any;
  onCancel?: any;
}

export const Modal = ({ title, children, onConfirm, onCancel }: Props) => {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-50">
      </div>

      <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full" >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                {title}
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {children}
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {onConfirm && (
                <button onClick={onConfirm} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go for it!</button>
              )}
              {onCancel && (
                <button onClick={onCancel} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Never mind!</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
