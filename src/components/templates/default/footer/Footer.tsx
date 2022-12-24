import Link from "next/link"
import React from "react"

export const Footer = () => {
  return (
    <p className="p-2 text-sm text-center text-lightgray">
      By using this website you agree to our{" "}
      <Link href="/privacy">Privacy policy</Link> and to cookies. Any trouble?
      Email{" "}
      <Link href="mailto:bdsmtest.org@gmail.com">bdsmtest.org@gmail.com</Link>{" "}
      for help.
    </p>
  )
}
