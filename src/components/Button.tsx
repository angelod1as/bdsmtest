import { clx } from "helpers/clx"
import React from "react"
import { FCC } from "types/types"

type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "primary" | "secondary"
}

export const Button: FCC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const newClassName = {
    primary: "bg-blue text-white",
    secondary: "bg-darkgray border-lightgray",
  }[variant]

  return (
    <button
      className={clx(className, newClassName, "border rounded px-4")}
      {...props}
    >
      {props.children}
      {variant === "primary" && " ▶"}
    </button>
  )
}
