import { getMessages } from "i18n/get-messages"
import { GetStaticProps } from "next"
import React from "react"

const Custom404 = () => {
  return <div>404 - Page not found</div>
}

export default Custom404

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      messages: await getMessages([], locale),
    },
  }
}
