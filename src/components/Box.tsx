import { clx } from "helpers/clx"
import React from "react"
import { FCC } from "types/types"
import { H2, H3 } from "./typography/typography"

type Level = 2 | 3

type BoxProps = {
  type: "inner" | "outer"
  className?: string
  title?: string
  level?: Level
}

const styles = {
  default: "rounded border border-lightgray p-3 flex flex-col",
  outer: "border-2 p-6 gap-8",
  inner: "border p-3 text-lightergray",
}

const outerBoxStyles = clx(styles.default, styles.outer)
const innerBoxStyles = clx(styles.default, styles.inner)

export const Box: FCC<BoxProps> = ({
  type,
  children,
  className,
  title,
  level = 2,
}) => {
  const style = type === "outer" ? outerBoxStyles : innerBoxStyles

  return (
    <div className="flex flex-col gap-3">
      {title && level === 2 && <H2>{title}</H2>}

      <div className={clx(style, className)}>
        {title && level === 3 && <H3>{title}</H3>}
        {children}
      </div>
    </div>
  )
}
