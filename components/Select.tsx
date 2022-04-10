import { useMemo } from "react"
import type { ChangeEventHandler } from 'react'

interface Select {
  options: { value: string, label: string }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({ options, onChange }: Select) => {
  const opts = useMemo(() => {
    return options.map((opt, i) => {
      return <option value={opt.value} key={i}>{opt.label}</option>
    })
  }, [options])

  return (
    <select className="form-select" onChange={onChange}>
      {opts}
    </select>
  )
}
