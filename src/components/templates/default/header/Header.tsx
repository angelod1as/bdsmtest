import React from "react"
import { Menu } from "./menu/Menu"
import { SiteTitle } from "./SiteTitle"

export const Header = () => {
  return (
    <div className="flex flex-col">
      <Menu />
      <SiteTitle />
    </div>
  )
}
