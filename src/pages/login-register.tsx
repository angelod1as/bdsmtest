import { LoginPage } from "components/pages/login/Login"
import { getMessages } from "i18n/get-messages"
import { GetStaticProps } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"

const Login = () => {
  const headT = useTranslations("common.head")
  const t = useTranslations("pages.login")
  const title = `${headT("title")} - ${t("head.title")}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("head.description")} />
      </Head>

      <LoginPage />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.login"], locale),
    },
  }
}

export default Login
