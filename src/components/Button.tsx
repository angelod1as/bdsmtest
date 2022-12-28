import { clx } from "helpers/clx"
import React from "react"
import { FCC } from "types/types"

export const Button: FCC<JSX.IntrinsicElements["button"]> = (props) => {
  return (
    <button
      className={clx(
        props.className,
        "border rounded bg-darkgray border-lightgray",
      )}
      {...props}
    />
  )
}
