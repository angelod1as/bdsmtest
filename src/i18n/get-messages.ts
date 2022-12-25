import pick from "lodash/pick"
import { generateNamespace } from "./generate-namespace"

export const getMessages = async (
  namespaces: string[],
  locale: string | undefined,
) => {
  return pick(
    (await import(`../../i18n/${locale}.json`)).default,
    generateNamespace(namespaces),
  )
}
