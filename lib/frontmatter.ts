import { getAllFilesFullPath, getId } from './paths'
import { Frontmatter } from './types/frontmatter'
import matter from 'gray-matter'
import fs from 'fs'
import { EYECATCH_DIR, FRONTMATTER_JSON, STORE_DIR } from './constants'

/**
 * フルパスから Frontmatter を取得する。
 * @param {string} fullPathToFile
 * @return {Frontmatter} Frontmatter
 */
export function getFrontmatter(fullPathToFile: string): Frontmatter {
  const fileContents = fs.readFileSync(fullPathToFile, 'utf8')
  const id = getId(fullPathToFile)
  console.log('matter(fileContents).data.eyeCatch', matter(fileContents).data.eyeCatch)
  return {
    id,
    title: matter(fileContents).data.title ?? '',
    date: matter(fileContents).data.date ?? '',
    tags: matter(fileContents).data.tags ?? '',
    description: matter(fileContents).data.description ?? '',
    eyeCatch:
      matter(fileContents).data.eyeCatch === ''
        ? getRandomEyeCatch()
        : matter(fileContents).data.eyeCatch,
    published: matter(fileContents).data.published ?? false,
    lastUpdated: matter(fileContents).data.lastUpdated ?? '',
  }
}

export function loadFrontmatters() {
  if (!fs.existsSync(FRONTMATTER_JSON)) {
    throw new Error(
      `${FRONTMATTER_JSON}が保存されていません。ビルド時間を短縮するために、まずはAPIから${FRONTMATTER_JSON}の保存を行ってください。`
    )
  }
  const data = fs.readFileSync(`${FRONTMATTER_JSON}`)
  const frontMatters: Frontmatter[] = JSON.parse(data.toString())
  return frontMatters
}

/**
 * ローカルディレクトリ(STORE_DIR)に Frontmatter を保存する。
 */
export function saveFrontmatters() {
  const allFiles = getAllFilesFullPath()
  const frontMatters = allFiles.map((file) => getFrontmatter(file))
  // frontmatter を日付でソートする
  const sortedFrontMatters = frontMatters.sort((fmA, fmB) => {
    if (fmA.date < fmB.date) {
      return 1
    } else {
      return -1
    }
  })
  // published が true のものだけに絞る
  const filteredFrontMatters = sortedFrontMatters.filter((frontMatter) => frontMatter.published)

  const storeFrontMatters = JSON.stringify(filteredFrontMatters)
  fs.writeFileSync(`./${FRONTMATTER_JSON}`, storeFrontMatters)
  return filteredFrontMatters
}

/**
 * データベースに Frontmatter を保存する。
 */
export function insertFrontmatter() {}

export function getRandomEyeCatch() {
  const files = fs.readdirSync(EYECATCH_DIR)
  const fileName = files[Math.floor(Math.random() * files.length)]
  console.log(`eyecatches/${fileName}`)
  return `eyecatches/${fileName}`
}
