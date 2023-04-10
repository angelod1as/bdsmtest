import { H4 } from "components/typography/typography"
import { Button } from "components/Button"

import { useTranslations } from "next-intl"

export const ChangeButtons = () => {
  const t = useTranslations("pages.profile.content")

  return (
    <div>
      <H4 className="mb-2">{t("change-title")}</H4>
      <div className="flex gap-2">
        <Button className="w-full" variant="secondary">
          {t("change-name")}
        </Button>
        <Button className="w-full" variant="secondary">
          {t("change-password")}
        </Button>
        <Button className="w-full" variant="secondary">
          {t("change-email")}
        </Button>
      </div>
    </div>
  )
}
