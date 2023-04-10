import { H4 } from "components/typography/typography"
import { Button } from "components/Button"

import { useTranslations } from "next-intl"
import { navigate } from "helpers/navigate"

export const ChangeButtons = () => {
  const t = useTranslations("pages.profile.content")

  return (
    <div>
      <H4 className="mb-2">{t("change-title")}</H4>
      <div className="flex gap-2">
        <Button
          onClick={() => navigate("changeName")}
          className="w-full"
          variant="secondary"
        >
          {t("change-name")}
        </Button>
        <Button
          onClick={() => navigate("changePassword")}
          className="w-full"
          variant="secondary"
        >
          {t("change-password")}
        </Button>
        <Button
          onClick={() => navigate("changeEmail")}
          className="w-full"
          variant="secondary"
        >
          {t("change-email")}
        </Button>
      </div>
    </div>
  )
}
