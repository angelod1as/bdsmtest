import React from "react"
import { FCC } from "types/types"

type InputProps = JSX.IntrinsicElements["input"] &
  JSX.IntrinsicElements["textarea"] & {
    name: string
    label: string
    error?: string
    type?: JSX.IntrinsicElements["input"]["type"] | "textarea"
  }

export const Input: FCC<InputProps> = ({
  name,
  label,
  type = "text",
  error,
  ...rest
}) => {
  const commonClassname =
    "px-2 py-1 text-white bg-black border rounded border-darkgray"
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-bold" htmlFor={name}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea className={commonClassname} id={name} {...rest} />
      ) : (
        <input className={commonClassname} id={name} {...rest} type={type} />
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
