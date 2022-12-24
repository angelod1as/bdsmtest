import React from "react"
import { Menu } from "./menu/Menu"
import { SiteTitle } from "./SiteTitle"

export const Header = () => {
  return (
    <div>
      <Menu />
      <SiteTitle />
    </div>
  )
}
