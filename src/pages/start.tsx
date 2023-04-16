import { StartPage } from "components/pages/start/Start"
import { getMessages } from "i18n/get-messages"
import { GetStaticProps } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"

const Start = () => {
  const headT = useTranslations("common.head")
  const t = useTranslations("pages.start")
  const title = `${headT("title")} - ${t("head.title")}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("head.description")} />
      </Head>

      <StartPage />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.start"], locale),
    },
  }
}

export default Start
