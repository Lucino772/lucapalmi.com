import './globals.scss'

import { Josefin_Sans } from '@next/font/google';

const font = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  )
}
