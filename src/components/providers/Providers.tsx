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
    <NextIntlProvider messages={pageProps.messages} timeZone="Etc/Universal">
      <IntlPolyfills />
      {children}
    </NextIntlProvider>
  )
}
