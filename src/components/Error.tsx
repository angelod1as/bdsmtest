import React from "react"
import { FCC } from "types/types"

export const Error: FCC = ({ children }) => {
  return <p className="text-red-500">{children}</p>
}
