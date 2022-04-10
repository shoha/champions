import { useMemo } from "react"
import type { ChangeEventHandler } from 'react'

interface Select {
  options: { value: string, label: string, selected: boolean }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  defaultValue: string;
}

export const Select = ({ options, onChange, defaultValue = "placeholder" }: Select) => {
  const opts = useMemo(() => {
    return options.map((opt, i) => {
      return <option value={opt.value} key={i}>{opt.label}</option>
    })
  }, [options])

  return (
    <select className="form-select" onChange={onChange} value={defaultValue}>
      <option value="placeholder" disabled hidden>Choose a character</option>
      {opts}
    </select>
  )
}
