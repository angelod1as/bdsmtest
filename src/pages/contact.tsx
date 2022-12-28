import Head from "next/head"
import { GetStaticProps, NextPage } from "next"
import { useTranslations } from "next-intl"
import { ContactPage } from "components/pages/contact/Contact"
import { getMessages } from "i18n/get-messages"

const Contact: NextPage = () => {
  const headT = useTranslations("common.head")
  const t = useTranslations("pages.contact")
  const title = `${headT("title")} - ${t("head.title")}`

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("head.description")} />
      </Head>

      <ContactPage />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.contact"], locale),
    },
  }
}

export default Contact
