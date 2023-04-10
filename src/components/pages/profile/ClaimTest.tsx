import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { Input } from "components/Input"
import { Button } from "components/Button"
import split from "lodash/split"
import includes from "lodash/includes"

export const ClaimTest = () => {
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const t = useTranslations("pages.profile.content")

  // TODO: Handle adding test
  // eslint-disable-next-line lodash/prefer-noop
  const handleAdd = () => {
    if (!includes(content, "/r/")) {
      return setError(t("invalid-url"))
    }

    const [, id] = split(content, "/r/")

    // add 'id' to user's tests
  }

  return (
    <div>
      <Input
        label={t("claim")}
        name="claim"
        placeholder={t("placeholder")}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        error={error}
        onClick={() => setError("")}
        rightElement={
          <Button variant="secondary" onClick={handleAdd}>
            Add
          </Button>
        }
      />
    </div>
  )
}
