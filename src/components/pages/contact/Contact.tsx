import { Box } from "components/Box"
import { H2 } from "components/typography/typography"
import { useTranslations } from "next-intl"
import React from "react"
import { ContactBox } from "./ContactBox"

export const ContactPage = () => {
  const t = useTranslations("pages.contact")
  const faq = t.raw("faq.content") as { question: string; answer: string }[]

  return (
    <Box type="outer">
      {/* About box */}
      <Box type="inner" title={t("about.title")}>
        {t.rich("about.rich-text-content")}
      </Box>

      {/* Contact box */}
      <ContactBox />

      {/* FAQ */}
      <div className="flex flex-col gap-3">
        <H2>{t("faq.title")}</H2>
        <div className="flex flex-col gap-5">
          {faq.map((item) => (
            <Box
              key={item.question}
              type="inner"
              title={item.question}
              level={4}
            >
              <div className="mt-2 italic">{item.answer}</div>
            </Box>
          ))}
        </div>
      </div>
    </Box>
  )
}
