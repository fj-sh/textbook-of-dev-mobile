import fs from 'fs'
import { loadFrontmatters } from '../frontmatter'
import { Frontmatter } from '../types/frontmatter'
import { SITEMAP_XML } from '../constants'

function makeSiteMap(frontMatters: Frontmatter[]) {
  const baseUrl = 'https://kyonyu-wiki.com'
  let siteMap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
`
  frontMatters.forEach((frontMatter) => {
    let lastMod = frontMatter.date
    if (frontMatter.lastUpdated) {
      lastMod = frontMatter.lastUpdated
    }
    siteMap += `<url>
  <loc>${baseUrl}/${frontMatter.id}</loc>
  <lastmod>${lastMod}</lastmod>
  <changefreq>daily</changefreq>
</url>
`
  })
  siteMap += `</urlset>`
  return siteMap
}

/**
 * public/sitemap.xml にサイトマップを書き込む。
 */
export function writeSiteMap() {
  const frontMatters = loadFrontmatters()
  const siteMap = makeSiteMap(frontMatters)
  fs.writeFileSync(`${SITEMAP_XML}`, siteMap)
  const postsCount = frontMatters.filter((frontMatter) => frontMatter.id != null).length
  return postsCount
}
