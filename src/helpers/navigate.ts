import Router from "next/router"
import { ROUTES } from "./routes"

export const PAGES = ROUTES.pages

export type RouteName = keyof typeof PAGES

/**
 * Navigates to pre-set route
 * @param route Route name
 * @param append String to be added at the end of URL
 */
export const navigate = (route: RouteName, append?: string) => {
  const path = PAGES[route] + (append ? `/${append}` : "")
  return Router.push(path)
}
