import { H2, H3 } from "components/typography/typography"
import { parseRichText } from "i18n/parse-rich-text"
import { useTranslations } from "next-intl"
import React from "react"

const archetypes = [
  "dominant",
  "submissive",
  "sadist",
  "masochist",
  "rigger",
  "rope-bunny",
  "master-mistress",
  "slave",
  "degrader",
  "degradee",
  "owner",
  "pet",
  "brat-tamer",
  "brat",
  "primal",
  "primal-hunter",
  "primal-prey",
  "daddy-mommy",
  "boy-girl",
  "ageplayer",
  "exhibitionist",
  "voyeur",
  "experimentalist",
  "non-monogamist",
  "switch",
  // "all-rounder", // left-out at the original site
  // "fetishist",   // left-out at the original site
  // "pervert",     // left-out at the original site
  "vanilla",
]

export const InfoPage = () => {
  const t = useTranslations("pages.info")
  const archetypeTranslations = useTranslations("archetypes")

  return (
    <div className="gap-8 p-6 custom-outer-box">
      {/* Info box */}
      <div className="flex flex-col gap-3">
        <H2 className="">{t("info.title")}</H2>
        <div className="custom-inner-box">
          {t.rich("info.rich-text-content", parseRichText)}
        </div>
      </div>

      {/* Archetypes box */}
      <div className="flex flex-col gap-3">
        <H2>{t("archetypes.title")}</H2>
        <div className="custom-inner-box">
          {t.rich("archetypes.rich-text-content", parseRichText)}
        </div>
        {archetypes.map((archetype) => {
          const name = `${archetype}.name`
          const description = `${archetype}.description`
          return (
            <div key={archetype} className="custom-inner-box">
              {/* Typescript is ignored below because of the lack of types
                to typecast name and description. An issue was opened.
                https://github.com/amannn/next-intl/issues/159
              */}
              {/* @ts-ignore */}
              <H3>{archetypeTranslations(name)}</H3>
              {/* @ts-ignore */}
              <p>{archetypeTranslations(description)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
