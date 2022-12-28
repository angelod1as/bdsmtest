import { Box } from "components/Box"
import { H3 } from "components/typography/typography"
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
    <Box type="outer">
      {/* Info box */}
      <Box type="inner" title={t("info.title")}>
        {t.rich("info.rich-text-content", parseRichText)}
      </Box>

      {/* Archetypes box */}
      <Box type="inner" title={t("archetypes.title")}>
        {t.rich("archetypes.rich-text-content", parseRichText)}
      </Box>

      {archetypes.map((archetype) => {
        // typescasting below because of lack of types. See discussion below:
        // https://github.com/amannn/next-intl/discussions/160
        const name = `${archetype}.name` as any
        const description = `${archetype}.description` as any
        return (
          <div key={archetype} className="custom-inner-box">
            <H3>{archetypeTranslations(name)}</H3>
            <p>{archetypeTranslations(description)}</p>
          </div>
        )
      })}
    </Box>
  )
}
