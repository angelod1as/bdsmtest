import { parseRichText } from "i18n/parse-rich-text"
import { NextIntlProvider } from "next-intl"
import { PageProps } from "pages/_app"
import React from "react"
import IntlPolyfills from "scripts/polyfills"
import { FCC } from "types/types"

type ProvidersProps = {
  pageProps: PageProps
}

export const Providers: FCC<ProvidersProps> = ({ children, pageProps }) => {
  return (
    <NextIntlProvider
      messages={pageProps.messages}
      timeZone="Etc/Universal"
      defaultTranslationValues={parseRichText}
    >
      <IntlPolyfills />
      {children}
    </NextIntlProvider>
  )
}
