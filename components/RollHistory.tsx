import { useToasterStore, resolveValue } from 'react-hot-toast'
import type { Toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

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
  }, [toasts.length, allToasts, setAllToasts])

  return (
    allToasts.length > 0 && (
      <div>
        <div className="mt-2 text-md italic font-semibold">
          History
        </div>
        <div className="mt-2 flex gap-2">
          {
            allToasts.map((t, i) => <div key={i}>{resolveValue(t.message, t)}</div>)
          }
        </div>
      </div>
    )
  )
}
