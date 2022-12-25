import "../styles/global.css"
import type { AppProps } from "next/app"
import { Default as DefaultTemplate } from "components/templates/default/Default"
import { Providers } from "components/providers/Providers"

export type PageProps = {
  messages: Record<string, string>
}

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <Providers pageProps={pageProps}>
      <DefaultTemplate>
        <Component {...pageProps} />
      </DefaultTemplate>
    </Providers>
  )
}
