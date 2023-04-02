import Router from "next/router"

const routes = {
  login: "/login",
  start: "/start",
}

type Route = keyof typeof routes

export const navigate = (route: Route) => {
  const path = routes[route]
  return Router.push(path)
}
