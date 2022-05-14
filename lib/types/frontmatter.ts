/**
 * FrontMatter
 */
export type FrontMatter = {
  id: string
  title: string
  date: string
  tags: string[]
  description: string | undefined
  eyeCatch: string
  published: boolean
  lastUpdated?: string
}
