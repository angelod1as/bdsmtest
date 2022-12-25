import "../styles/global.css"
import type { AppProps } from "next/app"
import { NextIntlProvider } from "next-intl"
import IntlPolyfills from "scripts/polyfills"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages} timeZone="Etc/Universal">
      <IntlPolyfills />
      <Component {...pageProps} />
    </NextIntlProvider>
  )
}
