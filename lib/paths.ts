import glob from 'glob'
import path from 'path'
import { POST_DIR } from './constants'

// パス情報をキャッシュする
let allPostPaths: string[] = []
/**
 * POST_DIR 以下の md または mdx のファイルへのフルパスを取得する。
 * @return {string[]} フルパスの配列
 */
export function getAllFilesFullPath() {
  if (allPostPaths.length === 0) {
    allPostPaths = glob.sync(`${POST_DIR}/**/*`, { nodir: true })
  }
  return allPostPaths.filter((fullPath) => /\.md$|\.mdx$/.test(fullPath))
}

/**
 * フルパスからサフィックス（md, mdx）を除いたファイル名を返す。
 * @param {string } fullPathToFile ファイルへのフルパス
 * @return {string}  id
 */
export function getId(fullPathToFile: string): string {
  const fileName = path.basename(fullPathToFile)
  return fileName.replace(/\.md$|\.mdx$/, '')
}

/**
 * ID からファイルへのフルパスを取得する。
 * @param {string} id ファイルID
 * @return {string} フルパス
 */
export function getFullPathById(id: string): string | undefined {
  const allFilesFullPath = getAllFilesFullPath()
  const targetFiles = allFilesFullPath.filter((fullPathToFile) => {
    const fileId = getId(fullPathToFile)
    return fileId === id
  })

  // 同じ id を持つファイルは存在しない
  if (targetFiles.length > 1) throw new Error('同じ ID を持つファイルが複数存在します。')
  return targetFiles[0]
}

/**
 * すべての id を取得する。
 * @return {string[]} 全ての記事の id の配列
 */
export function getAllPostIds() {
  const allFilesFullPath = getAllFilesFullPath()
  return allFilesFullPath.map((fullPathToFile) => getId(fullPathToFile))
}
