import { NextApiRequest, NextApiResponse } from 'next'
import { saveIdAndPaths } from '../../lib/post'
import { saveFrontmatters } from '../../lib/frontmatter'
import { writeSiteMap } from '../../lib/seo/sitemap'

const release = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('FrontMatterをシリアライズします...')
  saveFrontmatters()
  console.log('FrontMatterをシリアライズしました。')
  console.log('パスとIDをシリアライズします...')
  saveIdAndPaths()
  console.log('パスとIDをシリアライズしました。')
  console.log('サイトマップを作成します...')
  const postsCount = writeSiteMap()
  res.status(200).json({ posts: `リリースが完了しました。記事数[${postsCount}]` })
}

export default release
