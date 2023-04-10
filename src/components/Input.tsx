import { clx } from "helpers/clx"
import React, { ReactNode } from "react"
import { FCC } from "types/types"

export type InputProps = JSX.IntrinsicElements["input"] &
  JSX.IntrinsicElements["textarea"] & {
    name: string
    label: string
    error?: string
    type?: Omit<
      JSX.IntrinsicElements["input"]["type"] | "textarea",
      "radio" | "checkbox"
    >
    /** Element to the right of the Input. Ununsed in case of TextArea */
    rightElement?: ReactNode
  }

/**
 * Generic Input component
 * Mainly used for text or textarea input
 * for radio and checkbox, use respective components instead
 */
export const Input: FCC<InputProps> = ({
  name,
  label,
  type = "text",
  error,
  rightElement,
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
        <div className="flex gap-2">
          <input
            className={clx(commonClassname, "w-full")}
            id={name}
            {...rest}
            type={type}
          />
          {rightElement ? rightElement : ""}
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
