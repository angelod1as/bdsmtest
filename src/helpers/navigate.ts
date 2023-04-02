import Router from "next/router"
import { ROUTES } from "./routes"

export const PAGES = ROUTES.pages

export type RouteName = keyof typeof PAGES

export const navigate = (route: RouteName) => {
  const path = PAGES[route]
  return Router.push(path)
}
