import { clx } from "helpers/clx"
import React from "react"
import { FCC } from "types/types"
import { H2 } from "./typography/typography"

type BoxProps = {
  type: "inner" | "outer"
  className?: string
  title?: string
}

const styles = {
  default: "rounded border border-lightgray p-3 flex flex-col",
  outer: "border-2 p-6 gap-8",
  inner: "border p-3 text-lightergray",
}

const outerBoxStyles = clx(styles.default, styles.outer)
const innerBoxStyles = clx(styles.default, styles.inner)

export const Box: FCC<BoxProps> = ({ type, children, className, title }) => {
  const style = type === "outer" ? outerBoxStyles : innerBoxStyles

  return (
    <div className="flex flex-col gap-3">
      {title && <H2>{title}</H2>}
      <div className={clx(style, className)}>{children}</div>
    </div>
  )
}
