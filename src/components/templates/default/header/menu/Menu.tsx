import React from "react"
import { MenuButton } from "./MenuButton"
import { useTranslations } from "next-intl"
import { RouteName } from "helpers/navigate"
import { ROUTES } from "helpers/routes"

export const Menu = () => {
  const t = useTranslations("common.navigation")

  const menuItems: Array<{ label: string; route: RouteName }> = [
    {
      label: t("start-new-test"),
      route: "index",
    },
    {
      label: t("login"),
      route: "login",
    },
    {
      label: t("info-and-archetypes"),
      route: "info",
    },
    {
      label: t("about-faq-contact"),
      route: "contact",
    },
  ]
  return (
    <div className="flex justify-center">
      {menuItems.map(({ label, route }) => (
        <MenuButton key={route} label={label} url={ROUTES.pages[route]} />
      ))}
    </div>
  )
}
