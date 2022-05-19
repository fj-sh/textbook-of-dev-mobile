import fs from 'fs'
import path from 'path'
import { FullContentPost, IdAndPath } from './types/post'
import { ID_AND_PATHS_JSON } from './constants'
import { getFrontmatter } from './frontmatter'
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import { getAllPostIds, getFullPathById } from './paths'

type PostMdxResult = {
  mdxSource: MDXRemoteSerializeResult
  contentLength: number
}

async function getPostMdx(fullPathToFile: string): Promise<PostMdxResult> {
  const fileContents = fs.readFileSync(fullPathToFile, 'utf8')
  const mdxSource = await serialize(matter(fileContents).content)
  const contentLength = matter(fileContents).content.length
  return {
    mdxSource,
    contentLength,
  }
}

// IDとパスをキャッシュする。
let idAndPaths: IdAndPath[] = []

/**
 * IDから記事の内容を取得する。
 * @param {string} id 記事ID
 * @return {Promise<FullContentPost>} 記事の情報
 */
export async function getFullContentById(id: string): Promise<FullContentPost> {
  if (idAndPaths.length === 0) {
    if (!fs.existsSync(`${ID_AND_PATHS_JSON}`))
      throw new Error(
        `${ID_AND_PATHS_JSON}が保存されていません。ビルド時間短縮のため、APIから${ID_AND_PATHS_JSON}を保存してください。`
      )
    const data = fs.readFileSync(`${ID_AND_PATHS_JSON}`)
    idAndPaths = JSON.parse(data.toString())
  }

  const targetIdAndPath = idAndPaths.filter((idAndPath) => idAndPath.id === id)
  if (targetIdAndPath[0] === undefined || targetIdAndPath[0].path === undefined)
    throw new Error(`${id}のパス情報が存在しません。`)
  const fullPathToFile = targetIdAndPath[0].path
  const frontMatter = getFrontmatter(fullPathToFile)
  const { mdxSource, contentLength } = await getPostMdx(fullPathToFile)
  return {
    id,
    frontMatter,
    mdxSource,
    contentLength,
  }
}

/**
 * IDとパスを保存する。
 */
export function saveIdAndPaths() {
  const allIds = getAllPostIds()
  const idAndPaths: IdAndPath[] = []
  let index = 1
  const allIdLength = allIds.length
  allIds.forEach((id) => {
    console.log(`${allIdLength} 記事中、${index} 記事目のパスを取得しています...`)
    index++
    const path = getFullPathById(id)
    if (path !== undefined) {
      const replacedPath = path.replace('/Users/fj/dev/next-fanz/', './')
      const idAndPath = {
        id,
        path: replacedPath,
      }
      idAndPaths.push(idAndPath)
    }
  })

  const storeIdAndPaths = JSON.stringify(idAndPaths)
  fs.writeFileSync(`${ID_AND_PATHS_JSON}`, storeIdAndPaths)
}
