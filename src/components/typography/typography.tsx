import { clx } from "helpers/clx"
import React from "react"
import { FCC } from "types/types"

const commonProps = "text-center font-bold"

export const H1: FCC<JSX.IntrinsicElements["h1"]> = (props) => {
  return <h1 {...props} className={clx(props.className, commonProps)} />
}

export const H2: FCC<JSX.IntrinsicElements["h2"]> = (props) => {
  return <h2 {...props} className={clx(props.className, commonProps)} />
}

export const H3: FCC<JSX.IntrinsicElements["h3"]> = (props) => {
  return <h3 {...props} className={clx(props.className, commonProps)} />
}
