import { FC, PropsWithChildren } from "react"

export type FCC<T = unknown> = FC<PropsWithChildren<T>>

export type User = {
  username: string
  tests: Array<{
    date: Date
    id: string
  }>
}
