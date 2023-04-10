import { ProfilePage } from "components/pages/profile/Profile"
import { getMessages } from "i18n/get-messages"
import { GetStaticProps } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"
import React from "react"

const Profile = () => {
  const headT = useTranslations("common.head")
  const t = useTranslations("pages.profile")
  const title = `${headT("title")} - ${t("head.title")}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t("head.description")} />
      </Head>

      <ProfilePage />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages(["pages.profile"], locale),
    },
  }
}

export default Profile
