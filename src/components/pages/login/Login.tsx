import { Box } from "components/Box"
import { Button } from "components/Button"
import { Error } from "components/Error"
import { Input } from "components/Input"
import { Form, Formik } from "formik"
import { callApi } from "helpers/callApi"
import { navigate } from "helpers/navigate"
import { ROUTES } from "helpers/routes"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import * as yup from "yup"

export type LoginFormProps = {
  email?: string
  password?: string
}

// TODO: Implement NextAuth -- issue #32
export const LoginPage = () => {
  const [submitError, setSubmitError] = useState("")
  const t = useTranslations("pages.login")

  const handleFocus = () => setSubmitError("")

  const validationSchema = yup.object().shape({
    email: yup.string().email(t("login.email.error")).required("Required"),
    password: yup.string().required(),
  })

  // Must be async
  const handleSubmit = async (values: LoginFormProps) => {
    try {
      const response = await callApi.post({
        url: ROUTES.api.login,
        body: values,
      })
      if (response.ok === true) {
        // TODO: Return logged in
        return
      }

      // TODO: Proper error message
      setSubmitError(t("login.error"))
    } catch (error) {
      console.error(error)
      setSubmitError(t("login.error"))
    }
  }

  return (
    <Box type="outer">
      <Formik<LoginFormProps>
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, isSubmitting, handleChange }) => (
          <Form className="flex flex-col gap-4 mt-4">
            <Input
              label={t("login.email.label")}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              onFocus={handleFocus}
            />

            <Input
              label={t("login.password.label")}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              onFocus={handleFocus}
            />

            {submitError && <Error>{submitError}</Error>}
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {t("login.submit")}
            </Button>

            <Button
              variant="secondary"
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate("login")}
            >
              {t("login.forgot-password")}
            </Button>

            <Button variant="secondary" type="button" disabled={isSubmitting}>
              {t("login.register")}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
