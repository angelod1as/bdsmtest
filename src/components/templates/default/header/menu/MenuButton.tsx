import Link from "next/link"
import React from "react"
import { FCC } from "types/types"

type MenuButtonProps = {
  label: string
  url: string
}

export const MenuButton: FCC<MenuButtonProps> = ({ label, url }) => {
  return (
    <Link
      className="p-3 border rounded border-lightgray bg-darkgray"
      href={url}
    >
      {label}
    </Link>
  )
}
