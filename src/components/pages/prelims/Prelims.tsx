import { Box } from "components/Box"
import { Form } from "components/form/Form"
import { useTranslations } from "next-intl"
import { FC } from "react"
import { InputsObject, formatInputs } from "./formatInputs"

type PrelimsPage = {
  inputsObject: InputsObject
}

export const PrelimsPage: FC<PrelimsPage> = ({ inputsObject }) => {
  const content = useTranslations("pages.prelims.content")

  const inputs = formatInputs(inputsObject)

  const handleSubmit = () => {
    console.log("submit")
  }

  return (
    <Box type="inner" title={content("title")} level={3}>
      {inputs && (
        <Form
          initialValues={{}}
          onSubmit={handleSubmit}
          translations={{
            formError: "form error",
            submitLabel: "submit label",
          }}
          inputs={inputs}
        />
      )}
    </Box>
  )
}
