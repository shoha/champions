import { useToasterStore, resolveValue, ToastBar } from 'react-hot-toast'
import type { Toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

const Message = ({ toast }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '4px 10px',
      color: 'inherit',
      flex: '1 1 auto',
      whiteSpace: 'pre-line'
    }}>
      {resolveValue(toast.message, toast)}
    </div>
  )
}

const HistoryItem = ({ toast }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "#fff",
      color: "#363636",
      lineHeight: "1.3",
      willChange: "transform",
      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)",
      maxWidth: "350px",
      pointerEvents: "auto",
      padding: "8px 10px",
      borderRadius: "8px",
    }}>
      <Message toast={toast}></Message>
    </div >
  )
}

export const RollHistory = () => {
  const { toasts } = useToasterStore()
  const [allToasts, setAllToasts] = useState<Toast[]>([])

  useEffect(() => {
    const mergedToasts = toasts.reduce((memo, toast) => {
      if (!memo.find((t) => t.id === toast.id)) {
        memo.push(toast)
      }

      return memo

    }, [...allToasts])

    setAllToasts([...mergedToasts])
  }, [toasts, allToasts, setAllToasts])

  const showHistory = allToasts.length > 0

  return (
    showHistory && (
      <div className="fixed top-0 right-0 p-4 h-full bg-teal-50 w-52">
        < div className="mt-2 text-md italic font-semibold" >
          History
        </div >
        <div className="mt-2 flex gap-2 flex-col">
          {
            allToasts.map((t, i) => <HistoryItem key={i} toast={t}></HistoryItem>)
          }
        </div>
      </div >
    )
  )
}
