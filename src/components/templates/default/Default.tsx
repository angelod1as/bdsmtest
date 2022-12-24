import React from "react"
import { FCC } from "types/types"
import { Footer } from "./footer/Footer"
import { Header } from "./header/Header"

export const Default: FCC = ({ children }) => {
  return (
    <div className="flex flex-col h-full text-white bg-black">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )
}
