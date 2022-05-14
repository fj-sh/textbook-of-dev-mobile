import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types'
import { Frontmatter } from './frontmatter'

export type FullContentPost = {
  id: string
  frontMatter: Frontmatter
  mdxSource: MDXRemoteSerializeResult
}

export type IdAndPath = {
  id: string
  path: string
}
