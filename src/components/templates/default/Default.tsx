import React from "react"
import { FCC } from "types/types"
import { Header } from "./header/Header"

export const Default: FCC = ({ children }) => {
  return (
    <div className="h-full text-white bg-black">
      <Header />
      {children}
      <div>footer</div>
    </div>
  )
}
