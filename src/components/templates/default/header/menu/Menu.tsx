import React from "react"
import { MenuButton } from "./MenuButton"

const menuItems = [
  {
    label: "Start new BDSM test",
    url: "/select-mode",
  },
  {
    label: "Log In / Register",
    url: "/login-register",
  },
  {
    label: "BDSM Info & Archetypes",
    url: "/info",
  },
  {
    label: "About / FAQ / Contact",
    url: "/contact",
  },
]

export const Menu = () => {
  return (
    <div className="flex justify-center">
      {menuItems.map(({ label, url }) => (
        <MenuButton key={url} label={label} url={url} />
      ))}
    </div>
  )
}
