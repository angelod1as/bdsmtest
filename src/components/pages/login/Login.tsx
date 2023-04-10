import { Box } from "components/Box"
import { Button } from "components/Button"
import { Form } from "components/form/Form"
import { callApi } from "helpers/callApi"
import { navigate } from "helpers/navigate"
import { ROUTES } from "helpers/routes"
import { useTranslations } from "next-intl"
import React from "react"
import * as yup from "yup"

export type LoginFormProps = {
  email?: string
  password?: string
}

// TODO: Implement NextAuth -- issue #32
export const LoginPage = () => {
  const title = useTranslations("pages.login")
  const t = useTranslations("pages.login.content")

  const validationSchema = yup.object().shape({
    email: yup.string().email(t("email.error")).required(t("email.required")),
    password: yup.string().required(t("password.required")),
  })

  const handleSubmit = async (values: LoginFormProps) => {
    const response = await callApi.post({
      url: ROUTES.api.login,
      body: values,
    })

    if (response.ok === false) {
      throw new Error("no OK")
    }

    return navigate("profile")
  }

  return (
    <Box type="outer" title={title("title")} level={3}>
      <Form<LoginFormProps>
        initialValues={{ email: "", password: "" }}
        translations={{
          formError: t("error"),
          submitLabel: t("submit"),
        }}
        inputs={[
          {
            label: t("email.label"),
            name: "email",
            type: "email",
          },
          {
            label: t("password.label"),
            name: "password",
            type: "password",
          },
        ]}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      />

      <Button
        variant="secondary"
        type="button"
        onClick={() => navigate("login")}
      >
        {t("forgot-password")}
      </Button>

      <Button
        variant="secondary"
        type="button"
        onClick={() => navigate("register")}
      >
        {t("register")}
      </Button>
    </Box>
  )
}
