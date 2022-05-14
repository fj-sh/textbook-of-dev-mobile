import React from 'react'
import { NextPage } from 'next'

type PostProps = {
  fullContent: string
}

const Post: NextPage<PostProps> = ({ fullContent }: PostProps) => {
  const getPageUrl = () =>
    process.env.NODE_ENV === 'development' ? `${DEV_URL}/id` : `${PROD_URL}/id`

  return <>記事の本体です。</>
}

type IdParam = {
  params: {
    id: string
  }
}

type StaticPaths = {
  paths: IdParam[]
  fallback: boolean
}

export async function getStaticPaths(): Promise<StaticPaths> {
  // Frontmatter からパスを取得する

  return {
    paths: [],
    fallback: false,
  }
}
