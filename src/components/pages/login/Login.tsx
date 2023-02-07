import { Box } from "components/Box"
import { Button } from "components/Button"
import { Input } from "components/Input"
import { Form, Formik, FormikHelpers } from "formik"
import { callApi } from "helpers/callApi"
import { ROUTES } from "helpers/routes"
import { useTranslations } from "next-intl"
import React from "react"
import * as yup from "yup"

type FormProps = {
  email?: string
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Not a proper email").required("Required"),
})

export const LoginPage = () => {
  const t = useTranslations("pages.login")

  // Must be async
  const handleSubmit = async (
    values: FormProps,
    formikHelpers: FormikHelpers<FormProps>,
  ) => {
    try {
      await callApi.post({
        url: ROUTES.api.login,
        body: values,
      })
    } catch (error) {
      console.error(error)
      formikHelpers.setErrors({ email: t("login.error") })
    }
  }

  return (
    <Box type="outer">
      <Formik<FormProps>
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, isSubmitting, handleChange }) => (
          <Form className="flex flex-col gap-4 mt-4">
            <Input
              label={t("login.enterEmail")}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Button variant="secondary" type="submit" disabled={isSubmitting}>
              {t("login.submit")}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
