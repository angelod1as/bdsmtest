import React from "react"
import { FCC } from "types/types"
import { Footer } from "./footer/Footer"
import { Header } from "./header/Header"

export const Default: FCC = ({ children }) => {
  return (
    <div className="h-full text-white bg-black">
      <div className="flex flex-col h-full max-w-lg m-auto">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  )
}
