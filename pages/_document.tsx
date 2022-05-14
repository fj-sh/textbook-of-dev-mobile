import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import { SITE_TITLE } from '../lib/constants'
type Props = {}

class Document extends NextDocument<Props> {
  override render() {
    return (
      <Html lang="ja-JP" prefix="og: http://ogp.me/ns#">
        <Head>
          <meta name="application-name" content={SITE_TITLE} />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />
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
