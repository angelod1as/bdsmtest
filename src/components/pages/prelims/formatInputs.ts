import { FormInput } from "components/form/Form"
import keys from "lodash/keys"

type InputContent = {
  label: string
  options: Record<string, string>
}

export type InputsObject = Record<
  | "gender"
  | "ageCategory"
  | "country"
  | "orientation"
  | "language"
  | "length"
  | "scope"
  | "testCount",
  InputContent
>

const format: (
  _content: InputContent,
  _name: string,
  _type?: "select" | "option",
) => FormInput = ({ label, options }, name, type = "select") => {
  return {
    label,
    name,
    type,
    options: keys(options).map((option) => ({
      label: options[option],
      value: option,
    })),
  }
}

export const formatInputs: (_InputsObject: InputsObject) => Array<FormInput> = (
  inputsObject,
) => {
  return [
    format(inputsObject.gender, "gender"),
    format(inputsObject.ageCategory, "ageCategory"),
    format(inputsObject.orientation, "orientation"),
    format(inputsObject.country, "country"),
    format(inputsObject.language, "language"),
    format(inputsObject.length, "length", "option"),
    format(inputsObject.scope, "scope", "option"),
    format(inputsObject.testCount, "testCount"),
  ]
}
