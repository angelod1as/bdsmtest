import Head from "next/head"
import { GetStaticProps, NextPage } from "next"
import { useTranslations } from "next-intl"
import { InfoPage } from "components/pages/info/Info"
import { getMessages } from "i18n/get-messages"

const Info: NextPage = () => {
  const headT = useTranslations("common.head")
  const t = useTranslations("pages.info")
  const title = `${headT("title")} - ${t("head.title")}`

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("head.description")} />
      </Head>

      <InfoPage />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.info", "archetypes"], locale),
    },
  }
}

export default Info
