import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
type Props = {}
class Document extends NextDocument<Props> {
  override render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default Document
