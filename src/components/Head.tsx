import { useTranslations } from "next-intl"
import NextHead from "next/head"
import React from "react"

export const Head = () => {
  const t = useTranslations()
  return (
    <NextHead>
      <title>{t("common.head.title")}</title>
      <meta name="description" content={t("common.head.description")} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}
