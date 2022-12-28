import { RichTranslationValues } from "next-intl"
import Link from "next/link"

export const parseRichText: RichTranslationValues = {
  p: (content) => <p>{content}</p>,
  List: (content) => <ul>{content}</ul>,
  Item: (content) => <li>{content}</li>,
  EmailLink: () => (
    <Link href="mailto:bdsmtest.org@gmail.com">bdsmtest.org@gmail.com</Link>
  ),
}
