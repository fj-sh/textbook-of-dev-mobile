import type { NextPage } from 'next'
import { Frontmatter } from '../lib/types/frontmatter'
import { GetStaticProps } from 'next'
import { getFullContentById } from '../lib/post'
import { loadFrontmatters } from '../lib/frontmatter'
import Head from 'next/head'
import { SITE_TITLE } from '../lib/constants'
import Card from '../lib/components/molecules/Card'

type HomeProps = {
  frontmatters: Frontmatter[]
}

const Home: NextPage<HomeProps> = ({ frontmatters }: HomeProps) => {
  return (
    <>
      <Head>
        <meta name="description" content={`${SITE_TITLE}の記事一覧`} key="desc" />
        <meta property="og:description" content={`${SITE_TITLE}の記事一覧`} />
        <title>{SITE_TITLE}</title>
      </Head>
      <div className="container">
        <div className="itemList">
          {frontmatters.map((frontmatter) => (
            <Card
              title={frontmatter.title}
              image={frontmatter.eyeCatch}
              link={frontmatter.id}
              key={frontmatter.id}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @media screen and (min-width: 769px) {
          .container {
            width: 800px;
            margin: 0 auto;
          }
          .itemList {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const frontmatters = loadFrontmatters()
  return {
    props: {
      frontmatters,
    },
  }
}
