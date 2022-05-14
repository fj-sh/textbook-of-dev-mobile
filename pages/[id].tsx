import React from 'react'
import { GetStaticProps, NextPage } from 'next'

import { loadFrontmatters } from '../lib/frontmatter'
import { DEV_URL, PROD_URL, SITE_TITLE } from '../lib/constants'
import { ParsedUrlQuery } from 'querystring'
import { MDXRemote } from 'next-mdx-remote'
import { getFullContentById } from '../lib/post'
import { FullContentPost } from '../lib/types/post'
import Head from 'next/head'
import PublishDateSideBar from '../lib/components/organisms/PublishDateSideBar'
import { getSlashSeparatedDate } from '../lib/utils/date'

const useComponents = {}

type PostProps = {
  fullContentPost: FullContentPost
}

const Post: NextPage<PostProps> = ({ fullContentPost }: PostProps) => {
  const getPageUrl = () =>
    process.env.NODE_ENV === 'development' ? `${DEV_URL}/id` : `${PROD_URL}/id`

  return (
    <>
      <Head>
        <meta property={'og:type'} content={'article'} />
        <meta name="description" content={fullContentPost.frontMatter.description} key="desc" />
        <meta property="og:title" content={fullContentPost.frontMatter.title} />
        <meta property={'og:site_name'} content={`${SITE_TITLE}`} />
        <meta property="og:description" content={fullContentPost.frontMatter.description} />
        <meta property="og:image" content={fullContentPost.frontMatter.eyeCatch} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={getPageUrl()} />
        <meta name="twitter:url" content={getPageUrl()} />
        <meta name="twitter:title" content={fullContentPost.frontMatter.title} />
        <meta name="twitter:description" content={fullContentPost.frontMatter.description} />
        <meta name="twitter:image" content={fullContentPost.frontMatter.eyeCatch} />
        <title>{fullContentPost.frontMatter.title}</title>
      </Head>
      <div className="container">
        <div className="">
          <h1 className="">{fullContentPost.frontMatter.title}</h1>
          <div className="SmallDateTime">
            {getSlashSeparatedDate(fullContentPost.frontMatter.date)}に公開
          </div>
          <div className="flexbox">
            <div className="main">
              <article>
                <MDXRemote {...fullContentPost.mdxSource} components={useComponents} />
              </article>
            </div>
            <div className="side">
              <div className="datetime">
                <PublishDateSideBar frontmatter={fullContentPost.frontMatter} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
        }
        .container h1 {
          text-align: center;
        }

        .main {
          margin: 1rem 1rem;
          padding: 1.5rem 2.5rem;
          background: var(--c-base-bg);
          border-radius: 12px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        }

        /* タブレット縦以上の幅の場合 */
        @media screen and (min-width: 769px) {
          .container {
            margin: 0 8rem;
          }
          .flexbox {
            display: flex;
          }

          .main {
            width: calc(100% - 330px);
            margin: 0 auto;
            display: flex;
          }
          .side {
            width: 300px;
            background: var(--c-base-bg);
            padding: 4px 20px;
            margin: 0 2rem;
            height: 100%;
            border-radius: 12px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          }
          .SmallDateTime {
            display: none;
          }
        }

        /* タブレットの幅でサイドバーを消す */
        @media screen and (max-width: 769px) {
          .side {
            display: none;
          }
          .SmallDateTime {
            display: block;
            color: var(--c-gray-darker);
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}

export default Post

type IdParam = {
  params: {
    id: string
  }
}

type StaticPaths = {
  paths: IdParam[]
  fallback: boolean
}

/**
 * 配列で渡された id を `[{ params: { id1 } }, { params: { id2 } }]` の配列にして返す。
 * @param {string[]} ids
 * @return {IdParam[]} Id Params
 */
function convertIdsToStaticPathParams(ids: string[]): IdParam[] {
  return ids.map((id) => {
    return {
      params: {
        id,
      },
    }
  })
}

export async function getStaticPaths(): Promise<StaticPaths> {
  const frontmatters = loadFrontmatters()
  const publishedIds = frontmatters.map((frontmatter) => frontmatter.id)
  return {
    paths: convertIdsToStaticPathParams(publishedIds),
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const fullContentPost = await getFullContentById(id)
  return {
    props: {
      fullContentPost,
    },
  }
}
