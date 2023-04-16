import { FC, PropsWithChildren } from "react"

export type FCC<T = unknown> = FC<PropsWithChildren<T>>

export type User = {
  username: string
  tests: Array<{
    date: Date
    id: string
  }>
}

// Only uncomment what's actually used
export type InputTypes = "text" | "select" | "option" | "textarea"
// | "button"
// | "checkbox"
// | "color"
// | "date"
// | "datetime-local"
// | "email"
// | "file"
// | "hidden"
// | "image"
// | "month"
// | "number"
// | "password"
// | "radio"
// | "range"
// | "reset"
// | "search"
// | "submit"
// | "tel"
// | "time"
// | "url"
// | "week"
