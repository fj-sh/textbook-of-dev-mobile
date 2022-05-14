import { AppProps } from 'next/app'
import Head from 'next/head'
import { SITE_TITLE } from '../lib/constants'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>${SITE_TITLE}</title>
      <meta name="google" content="notranslate" />
      <meta name="twitter:creator" content="@echo_witt" />
      <meta name="referrer" content="strict-origin" />
      <meta property="og:title" content="Geist UI" />
      <meta property="og:site_name" content="Geist UI" />
      <meta property="og:url" content="https://geist-ui.dev" />
      <link rel="dns-prefetch" href="//geist-ui.dev" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="generator" content="Geist UI" />
      <meta
        name="description"
        content="An open-source design system for building modern websites and applications."
      />
      <meta
        property="og:description"
        content="An open-source design system for building modern websites and applications."
      />
      <meta
        itemProp="image"
        property="og:image"
        content="https://user-images.githubusercontent.com/11304944/91128466-dfc96c00-e6da-11ea-8b03-a96e6b98667d.png"
      />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/11304944/91128466-dfc96c00-e6da-11ea-8b03-a96e6b98667d.png"
      />
      <meta
        property="twitter:image"
        content="https://user-images.githubusercontent.com/11304944/91128466-dfc96c00-e6da-11ea-8b03-a96e6b98667d.png"
      />
      <meta
        name="viewport"
        content="initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
      />
    </Head>
    <Component {...pageProps} />
    <style jsx global>
      {`
        :root {
          --c-primary: #3ea8ff;
          --c-primary-darker: #0f83fd;
          --c-body: #000000d1;
          --c-body-content: #3e3f48;
          --c-gray: #93a5b1;
          --c-gray-lighter: #acbcc7;
          --c-gray-darker: #6e7b85;
          --c-gray-border: #d6e3ed;
          --c-gray-border-lighter: #5c93bb2b;
          --c-base-bg: #fff;
          --c-primary-bg: #e7eff6;
          --c-primary-bg-darker: #c6d5e2;
          --c-primary-bg-lighter: #f1f5f9;
          --c-primary-bg-lightest: #eff6fb99;
          --c-blue-bg: #e0efff;
          --c-blue-bg-lighter: #e6f2ff;
          --c-contrast: #1b1b1d;
          --c-error: #ff6868;
          --c-error-bg: #fff0f0;
          --c-like: #f76685;
          --c-like-bg: #ffeaf4;
          --c-idea: #807aff;
          --c-idea-bg: #f3f2ff;
          --c-closed-bg: #545c77;
          --c-focus-shadow: #bfdcff;
        }

        html {
          background: var(--c-primary-bg);
        }

        h1 {
          margin-top: 3rem;
          font-size: 2rem;
        }
      `}
    </style>
  </>
)
export default App
