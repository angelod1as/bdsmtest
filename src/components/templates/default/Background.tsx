import React from "react"
import Image from "next/image"
import bg from "/public/bg.jpg"

export const Background = () => {
  return (
    <div className="fixed inset-0 flex justify-center align-center -z-10">
      <div className="mt-20">
        <Image src={bg} alt="" className="p-10 opacity-50" />
      </div>
    </div>
  )
}
