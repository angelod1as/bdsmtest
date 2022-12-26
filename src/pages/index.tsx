import Head from "next/head"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useTranslations } from "next-intl"
import { getMessages } from "i18n/get-messages"

export default function Home(): InferGetStaticPropsType<typeof getStaticProps> {
  const t = useTranslations("common.head")
  return (
    <div>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>

      <div className="font-extrabold bg-fuchsia-300">Hello World.</div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages([], locale),
    },
  }
}
