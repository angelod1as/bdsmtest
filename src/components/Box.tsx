import { clx } from "helpers/clx"
import React from "react"
import { FCC } from "types/types"
import { H2, H3, H4 } from "./typography/typography"

type Level = 2 | 3 | 4

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
      {level === 2 && <Header level={level} title={title} />}
      <div className={clx(style, className)}>
        {level > 2 && <Header level={level} title={title} />}
        {children}
      </div>
    </div>
  )
}

const Header: FCC<{ title?: string; level: Level }> = ({ title, level }) => {
  // Extracted to be expandable
  if (!title) return null
  switch (level) {
    case 2:
      return <H2>{title}</H2>
    case 3:
      return <H3>{title}</H3>
    case 4:
      return <H4>{title}</H4>
    default:
      return null
  }
}
