import { Box } from "components/Box"
import { Button } from "components/Button"
import { Input } from "components/Input"
import { Form, Formik } from "formik"
import { useTranslations } from "next-intl"
import React from "react"
import * as yup from "yup"

type FormProps = {
  content?: string
}

export const ContactBox = () => {
  const t = useTranslations("pages.contact")

  const validationSchema = yup.object().shape({
    content: yup.string().required("Required"),
  })

  // Must be async
  const handleSubmit = async (values: FormProps) => {
    console.log(values, "submitted")
  }

  return (
    <Box type="inner" title={t("contact.title")}>
      {t.rich("contact.rich-text-content")}
      <Formik<FormProps>
        initialValues={{ content: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, isSubmitting, handleChange, submitCount }) => (
          <Form className="flex flex-col gap-4 mt-4">
            <Input
              label={t("contact.form-title")}
              name="content"
              type="textarea"
              value={values.content}
              onChange={handleChange}
              error={errors.content}
            />
            {submitCount > 0 ? (
              <p>{t("contact.submitted")}</p>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  )
}
