import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { Input } from "components/Input"
import { Button } from "components/Button"

export const ClaimTest = () => {
  const [content, setContent] = useState("")
  const t = useTranslations("pages.profile.content")

  // TODO: Handle adding test
  // eslint-disable-next-line lodash/prefer-noop
  const handleAdd = () => {
    // add 'content' to user's tests
  }

  return (
    <div>
      <Input
        label={t("claim")}
        name="claim"
        placeholder={t("placeholder")}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rightElement={
          <Button variant="secondary" onClick={handleAdd}>
            Add
          </Button>
        }
      />
    </div>
  )
}
