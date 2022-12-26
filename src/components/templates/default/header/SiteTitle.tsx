import { H2 } from "components/typography/typography"
import { useTranslations } from "next-intl"
import React from "react"

export const SiteTitle = () => {
  const t = useTranslations()
  return (
    <>
      {/* Hidden h1 with the actual title */}
      <h1 className="hidden">{t("common.head.title")}</h1>
      {/* h2 with the logline */}
      <H2 className="mx-2 my-8 font-serif text-2xl font-extrabold text-center small-caps text-lightergray">
        {t("common.title")}
      </H2>
    </>
  )
}
