import { Box } from "components/Box"
import { getMessages } from "i18n/get-messages"
import { GetStaticProps } from "next"
import { useTranslations } from "next-intl"
import React from "react"

const Custom404 = () => {
  const t = useTranslations()
  return (
    <Box type="outer" title={t("common.not-found")}>
      <p>This page has not been found, please try again</p>
    </Box>
  )
}

export default Custom404

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages([], locale),
    },
  }
}
