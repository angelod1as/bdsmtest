import { Box } from "components/Box"
import { Button } from "components/Button"
import { Form } from "components/form/Form"
import { callApi } from "helpers/callApi"
import { navigate } from "helpers/navigate"
import { ROUTES } from "helpers/routes"
import { useTranslations } from "next-intl"
import React from "react"
import * as yup from "yup"

export type RegisterFormProps = {
  email?: string
  "email-repeat"?: string
  password?: string
  "password-repeat"?: string
  name?: string
}

export const RegisterPage = () => {
  const title = useTranslations("pages.register")
  const t = useTranslations("pages.register.content")

  const validationSchema = yup.object().shape({
    email: yup.string().email(t("email.error")).required(t("email.required")),
    "email-repeat": yup
      .string()
      .email(t("email-repeat.error"))
      .oneOf([yup.ref("email"), null], "E-mails must match")
      .required(t("email-repeat.required")),
    password: yup
      .string()
      .min(8, t("password.min"))
      .matches(/.*[A-Z]/, "must contain an uppercase letter")
      .matches(/.*[a-z]/, "must contain a lowercase letter")
      .matches(/.*[0-9]/, "must contain at least one number")
      .matches(/.*[!@#\$%\^&\*]/, "must contain at least one special character")
      .required(t("password.required")),
    "password-repeat": yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(t("password-repeat.required")),
    name: yup.string().required(t("name.required")),
  })

  const handleSubmit = async (values: RegisterFormProps) => {
    const response = await callApi.post({
      url: ROUTES.api.register,
      body: values,
    })

    if (response.ok === false) {
      throw new Error("no OK")
    }

    // TODO: Return registered
    return
  }

  return (
    <Box type="outer" title={title("title")} level={3}>
      <Form<RegisterFormProps>
        initialValues={{
          "email-repeat": "",
          "password-repeat": "",
          email: "",
          name: "",
          password: "",
        }}
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
            label: t("email-repeat.label"),
            name: "email-repeat",
            type: "email",
          },
          {
            label: t("password.label"),
            name: "password",
            type: "password",
          },
          {
            label: t("password-repeat.label"),
            name: "password-repeat",
            type: "password",
          },
          {
            label: t("name.label"),
            name: "name",
            type: "text",
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
        {t("back")}
      </Button>
    </Box>
  )
}
