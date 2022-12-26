import compact from "lodash/compact" // .filter(Boolean)

// this very ugly type exists to avoid ts(2589)
// it's not infinitely recursive and accepts only 3 levels. E.g:
// clx('level 0', ['level 1', ['level 2', ['level 3', ['level 4 (errors)']]]])
type StringAndArray<T> = string | undefined | Array<T>
type RecursiveArray = Array<
  StringAndArray<StringAndArray<StringAndArray<string>>>
>

export const clx = (...classNames: RecursiveArray): string => {
  return compact(classNames).flat(Infinity).join(" ")
}
