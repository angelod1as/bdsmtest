import Head from "next/head"
import { GetStaticProps, NextPage } from "next"
import { useTranslations } from "next-intl"
import { InfoPage } from "components/pages/info/Info"
import { getMessages } from "i18n/get-messages"

const Info: NextPage = () => {
  const head = useTranslations("common.head")
  const t = useTranslations("pages.info")

  return (
    <div>
      <Head>
        <title>
          {head("title")} - {t("head.title")}
        </title>
        <meta name="description" content={t("head.description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InfoPage />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.info"], locale),
    },
  }
}

export default Info
