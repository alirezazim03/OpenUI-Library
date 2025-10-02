import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import BackToTop from "../components/GoToTop"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <BackToTop />
      <Analytics />
    </>
  )
}
