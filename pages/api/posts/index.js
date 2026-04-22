import connectDB from '../../../lib/db'
import Post from '../../../models/Post'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req, res) {
  await connectDB()

  if (req.method === 'GET') {
    const { search } = req.query
    let query = {}
    if (search) {
      query = { $or: [{ title: new RegExp(search, 'i') }, { tags: new RegExp(search, 'i') }] }
    }
    const posts = await Post.find(query).sort({ createdAt: -1 })
    return res.status(200).json(posts)
  }

  if (req.method === 'POST') {
    const token = req.cookies.token
    if (!verifyToken(token)) return res.status(401).json({ message: 'Unauthorized' })

    const { title, content, tags, coverImage } = req.body
    const post = await Post.create({ title, content, tags, coverImage })
    return res.status(201).json(post)
  }

  res.status(405).end()
}