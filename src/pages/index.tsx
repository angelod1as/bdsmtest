import Head from "next/head"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useTranslations } from "next-intl"
import { getMessages } from "i18n/get-messages"
import { Box } from "components/Box"
import Link from "next/link"
import { Form, Formik } from "formik"
import { Radio } from "components/Radio"
import { Button } from "components/Button"
import { stringToBoolean } from "helpers/stringToBoolean"
import { useRouter } from "next/router"

type FormProps = {
  goToLogin: "false" | "true" // has to be string because of Radio types
}

export default function Home(): InferGetStaticPropsType<typeof getStaticProps> {
  const tCommon = useTranslations("common.head")
  const t = useTranslations("pages.index")
  const { push } = useRouter()

  const handleSubmit = async ({ goToLogin }: FormProps) => {
    const redirectToLogin = stringToBoolean(goToLogin)
    if (redirectToLogin) return push("/login-register")
    return push("/start")
  }

  return (
    <div>
      <Head>
        <title>{tCommon("title")}</title>
        <meta name="description" content={tCommon("description")} />
      </Head>

      <Box type="outer" title={t("title")} level={3}>
        <p className="text-center">{t("account")}</p>

        {/* TODO: This should be two buttons instead of a form */}
        <Formik<FormProps>
          initialValues={{ goToLogin: "false" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <Radio
                name="goToLogin"
                options={[
                  { label: t("form.anonymous"), value: "false" },
                  { label: t("form.login"), value: "true" },
                ]}
              />
              <Button type="submit" disabled={isSubmitting}>
                {t("form.submit")} ▶
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-center">
          {t.rich("disclaimer", {
            br: () => <br />,
            Link: (chunks) => <Link href="/info">{chunks}</Link>,
          })}
        </p>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.index"], locale),
    },
  }
}
