import { NextApiRequest, NextApiResponse } from "next"
import assert from "ow"

export type responseItem = {}

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseItem>,
) {
  const { email } = req.body
  assert(email, assert.string.not.empty)

  // TODO: check email and respond

  res.send(200)
}
