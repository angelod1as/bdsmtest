import { PrelimsPage } from "components/pages/prelims/Prelims"
import { getMessages } from "i18n/get-messages"
import { GetStaticProps } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"
import { FC } from "react"

type PrelimsProps = {
  messages: Record<string, any>
}

const Prelims: FC<PrelimsProps> = ({ messages }) => {
  const headT = useTranslations("common.head")
  const t = useTranslations("pages.prelims")
  const title = `${headT("title")} - ${t("head.title")}`

  const inputsObject = messages?.pages?.prelims?.content?.inputs

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("head.description")} />
      </Head>

      {inputsObject && <PrelimsPage inputsObject={inputsObject} />}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.prelims"], locale),
    },
  }
}

export default Prelims
