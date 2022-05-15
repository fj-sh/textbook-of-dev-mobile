import fs from 'fs'
import request from 'request'
import playwright from 'playwright-core'

const getImageUrlList = async (uri: string) => {
  const browser = await playwright.chromium.launch({ channel: 'chrome', headless: false })
  const page = await browser.newPage()
  await page.goto(uri)
  await page.waitForTimeout(2000)
  const imageListSelector = `#app > div:nth-child(2) > div:nth-child(4) > div > div > div.results--efirA > div > div:nth-child(n) > div > div > div > a > img`
  const imageElements = await page.$$(imageListSelector)
  const imageSrcList: string[] = []
  for (const imageElement of imageElements) {
    const src = await imageElement.getAttribute('src')
    if (src !== null) {
      if (
        src.endsWith('.png') ||
        src.endsWith('.jpg') ||
        src.endsWith('.jpeg') ||
        src.endsWith('webp')
      )
        imageSrcList.push(src)
    }
  }
  await page.close()
  await browser.close()
  return imageSrcList
}

const download = (uri: string, filename: string, callback: any) => {
  request.head(uri, function (err: Error, res: any, body: any) {
    console.log('content-type:', res.headers['content-type'])
    console.log('content-length:', res.headers['content-length'])

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

export const downloadImages = async () => {
  let index = 32
  const uri = 'https://pixabay.com/images/search/?pagi=3&'
  const imageSrcList = await getImageUrlList(uri)
  for (const imageSrc of imageSrcList) {
    download(imageSrc, `public/eyecatches/eyecatch-${index}.jpg`, function () {
      console.log('done')
    })
    index++
  }
}
