// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { downloadImages } from '../../lib/tools/download-images'
import { getRandomEyecatch } from '../../lib/frontmatter'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  getRandomEyecatch()
  res.status(200).json({ name: 'John Doe' })
}
