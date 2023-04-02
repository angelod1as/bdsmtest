import isString from "lodash/isString"
import isArray from "lodash/isArray"

// "any" below to fix Formik types issue
export const errorToString = (error: any): string | undefined => {
  if (isString(error)) return error
  if (isArray(error)) return error.join(", ")
  return undefined
}
