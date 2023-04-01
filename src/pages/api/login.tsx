import { LoginFormProps } from "components/pages/login/Login"
import { NextApiRequest, NextApiResponse } from "next"
import assert from "ow"

type RequestBody = LoginFormProps

export type Response = {}

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const body: RequestBody = JSON.parse(req.body)
  const { email, password } = body
  assert(email, assert.string.not.empty)
  assert(password, assert.string.not.empty)

  // TODO: Decifer the original code on how to do the API call and
  // respond accordingly. This call skips the email check, a security bad practice.

  console.log("test")

  if (email === "ok@test.com") {
    return res.json({
      ok: true,
      status: "OK",
    })
  }

  if (email === "not-ok@test.com") {
    return res.status(500).json({
      ok: false,
      status: "not OK",
    })
  }

  return res.status(500).send(new Error("Wrong test email"))
}
