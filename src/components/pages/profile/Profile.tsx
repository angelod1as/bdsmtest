import { Box } from "components/Box"
import { Button } from "components/Button"
import { H2 } from "components/typography/typography"
import { navigate } from "helpers/navigate"
import { useTranslations } from "next-intl"
import React from "react"
import { FCC, User } from "types/types"
import { ChangeButtons } from "./ChangeButtons"
import { PreviousTests } from "./PreviousTests"
import { ClaimTest } from "./ClaimTest"

type ProfilePageProps = {
  user: User
}

export const ProfilePage: FCC<ProfilePageProps> = ({ user }) => {
  const t = useTranslations("pages.profile.content")

  return (
    <Box type="outer" className="gap-12">
      <H2>{t("welcome", { username: user.username })}</H2>

      <ChangeButtons />

      <PreviousTests tests={user.tests} />

      <ClaimTest />

      <Button variant="primary" onClick={() => navigate("index")}>
        {t("start-new-test")}
      </Button>

      <Button variant="secondary" onClick={() => navigate("deleteAccount")}>
        {t("delete-account")}
      </Button>
    </Box>
  )
}
