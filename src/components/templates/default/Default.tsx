import React from "react"
import { FCC } from "types/types"
import { Background } from "./Background"
import { Footer } from "./Footer"
import { Header } from "./header/Header"

export const Default: FCC = ({ children }) => {
  return (
    <div className="z-50 flex flex-col h-full bg-black text-lightergray grow">
      <div className="flex flex-col h-full max-w-lg m-auto grow">
        <Header />
        <Background />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  )
}
