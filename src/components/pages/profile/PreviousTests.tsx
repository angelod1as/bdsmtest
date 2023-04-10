import { Button } from "components/Button"
import { H4 } from "components/typography/typography"
import { navigate } from "helpers/navigate"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { FCC, User } from "types/types"

type PreviousTestsProps = {
  tests: User["tests"]
}

export const PreviousTests: FCC<PreviousTestsProps> = ({ tests }) => {
  const { locale } = useRouter()
  const t = useTranslations("pages.profile.content")

  // TODO: Handle removal of test result from profile
  // eslint-disable-next-line lodash/prefer-noop
  const handleRemoveTestFromAccount = (id: string) => {}

  return (
    <div>
      <H4 className="mb-2">{t("previous-tests")}</H4>

      <div className="flex flex-col gap-4">
        {tests.map(({ date, id }) => {
          const dateStr = date.toLocaleDateString(locale, {
            dateStyle: "long",
          })

          return (
            <div key={id} className="flex items-center justify-between gap-4">
              <p className="flex-1">{dateStr}</p>

              <Button variant="primary" onClick={() => navigate("result", id)}>
                {t("view")}
              </Button>

              <Button
                variant="secondary"
                onClick={() => handleRemoveTestFromAccount(id)}
              >
                {t("remove")}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
