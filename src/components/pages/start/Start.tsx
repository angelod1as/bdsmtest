import { Button } from "components/Button"
import { navigate } from "helpers/navigate"
import React from "react"

export const StartPage = () => {
  // In the original website, this page includes a re-captcha
  // This is just a placeholder for now

  return (
    <div>
      <Button onClick={() => navigate("prelims")}>Continue</Button>
    </div>
  )
}
