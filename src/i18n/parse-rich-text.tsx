import { RichTranslationValues } from "next-intl"

export const parseRichText: RichTranslationValues = {
  p: (content) => <p>{content}</p>,
  List: (content) => <ul>{content}</ul>,
  Item: (content) => <li>{content}</li>,
}
