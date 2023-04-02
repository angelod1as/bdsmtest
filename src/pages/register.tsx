import { RegisterPage } from "components/pages/register/Register"
import { getMessages } from "i18n/get-messages"
import { GetStaticProps } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"

const Register = () => {
  const headT = useTranslations("common.head")
  const t = useTranslations("pages.register")
  const title = `${headT("title")} - ${t("head.title")}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("head.description")} />
      </Head>

      <RegisterPage />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.register"], locale),
    },
  }
}

export default Register
