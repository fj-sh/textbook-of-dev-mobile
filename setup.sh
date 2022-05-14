#!/bin/zsh


# .gitignore
gibo dump node > .gitignore


# .env の作成
touch .env
touch .env.local
touch .env.sample
echo ".env.local" >> .gitignore


# prettier
pnpm i -D prettier eslint-config-prettier
touch .prettierrc.js
cat << EOF > .prettierrc.js
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  semi: false,
}
EOF

# eslint
rm .eslintrc.json
cat << EOF > .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['next/core-web-vitals', 'prettier'],
}
EOF

# ディレクトリの作成
mkdir -p lib/components
mkdir lib/utils

# cloudflare functions を使う場合
mkdir functions

# pages/_document.tsx の作成
# https://gist.github.com/elzup/db2229b132ccda46d4ac3b25a52b60b7
touch pages/_document.tsx
cat << EOF > pages/_document.tsx
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
EOF


# pages/_app.tsx の上書き
cat << EOF > pages/_app.tsx
import { AppProps } from 'next/app'
import Head from 'next/head'
const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
      <link rel="manifest" href="/manifest.json" />
      </Head>
    <Component {...pageProps} />
  </>
)
export default App
EOF

# styled-jsx のインストール
pnpm i -D styled-jsx

# tailwind css のインストール
pnpm install -D tailwindcss postcss autoprefixer
pnpm exec tailwindcss init -p

cat << EOF > tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# global.css の上書き
cat << EOF > styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF


# tsconfig.json の上書き
cat << EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF
