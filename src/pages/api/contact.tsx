import { NextApiRequest, NextApiResponse } from "next"
import assert from "ow"

export type responseItem = {}

export default async function contactHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseItem>,
) {
  const { contact } = req.body
  assert(contact, assert.string.not.empty)

  // TODO: Send the contact to a proper DB

  res.send(200)
}
