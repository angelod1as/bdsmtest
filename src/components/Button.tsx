import { clx } from "helpers/clx"
import React from "react"
import { FCC } from "types/types"

type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "primary" | "secondary"
}

export const Button: FCC<ButtonProps> = ({ variant = "primary", ...props }) => {
  const className = {
    primary: "bg-blue text-white",
    secondary: "bg-darkgray border-lightgray",
  }[variant]

  return (
    <button
      className={clx(props.className, className, "border rounded")}
      {...props}
    />
  )
}
