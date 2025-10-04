import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import BackToTop from "../components/GoToTop"
import { ThemeProvider } from "../contexts/ThemeContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <BackToTop />
      <Analytics />
    </ThemeProvider>
  )
}
