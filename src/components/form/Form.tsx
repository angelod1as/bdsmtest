import { Button } from "components/Button"
import { ErrorMessage } from "components/ErrorMessage"
import { Input, InputProps } from "components/Input"
import {
  Formik,
  FormikConfig,
  Form as FormikForm,
  FormikHelpers,
  FormikValues,
} from "formik"
import { errorToString } from "helpers/errorToString"

import React, { useState } from "react"
import { InputTypes } from "types/types"

type InputTypesWithOptions = "select" | "option"

export type FormInput = {
  label: InputProps["label"]
  name: InputProps["name"]
} & (
  | {
      type?: Extract<InputTypes, InputTypesWithOptions>
      options: Array<{
        label: string
        value: string | number
      }>
    }
  | {
      type?: Exclude<InputTypes, InputTypesWithOptions>
      options?: never
    }
)

type FormProps<Values> = {
  inputs: Array<FormInput>
  translations: {
    formError: string
    submitLabel: string
  }
  initialValues: Required<Values>
}

/**
 * Form
 *
 * Wraps a Formik Form
 *
 * "onSubmit" must be async and has a try-catch (auto handles errors)
 */
export const Form = <Values extends FormikValues>({
  onSubmit,
  translations,
  inputs,
  ...formikProps
}: FormikConfig<Values> & FormProps<Values>) => {
  const [submitError, setSubmitError] = useState("")

  const handleFocus = () => setSubmitError("")

  const handleSubmit = async (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => {
    try {
      await onSubmit(values, formikHelpers)
    } catch (error) {
      setSubmitError(translations.formError)
    }
  }

  return (
    <Formik<Values>
      {...formikProps}
      onSubmit={handleSubmit}
      validateOnChange={formikProps.validateOnChange || false}
    >
      {({ errors, values, isSubmitting, handleChange }) => (
        <FormikForm className="flex flex-col gap-4 mt-4">
          {inputs?.map(({ type = "text", name, label }) => {
            switch (type) {
              // TODO: Add input types
              default:
                return (
                  <Input
                    label={label}
                    name={name}
                    type={type}
                    value={values[name]}
                    onChange={handleChange}
                    error={errorToString(errors[name])}
                    onFocus={handleFocus}
                  />
                )
            }
          })}

          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {translations.submitLabel}
          </Button>
        </FormikForm>
      )}
    </Formik>
  )
}
