import { RegisterFormProps } from "components/pages/register/Register"
import { NextApiRequest, NextApiResponse } from "next"
import assert from "ow"

type RequestBody = RegisterFormProps

export type Response = {}

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const body: RequestBody = JSON.parse(req.body)
  const {
    email,
    password,
    name,
    "email-repeat": emailRepeat,
    "password-repeat": passwordRepeat,
  } = body
  assert(email, assert.string.not.empty)
  assert(emailRepeat, assert.string.not.empty)
  assert(password, assert.string.not.empty)
  assert(passwordRepeat, assert.string.not.empty)
  assert(name, assert.string.not.empty)

  if (email !== emailRepeat) {
    res.status(500).send(new Error("E-mails don't match"))
  }

  if (password !== passwordRepeat) {
    res.status(500).send(new Error("Passwords don't match"))
  }

  // TODO: Decifer the original code on how to do the API call and
  // respond accordingly.

  return res.status(200).send({})
}
