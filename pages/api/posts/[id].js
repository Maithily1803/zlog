import connectDB from '../../../lib/db'
import Post from '../../../models/Post'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req, res) {
  await connectDB()
  const { id } = req.query

  if (req.method === 'GET') {
    const post = await Post.findById(id)
    if (!post) return res.status(404).json({ message: 'Not found' })
    return res.status(200).json(post)
  }

  const token = req.cookies.token
  if (!verifyToken(token)) return res.status(401).json({ message: 'Unauthorized' })

  if (req.method === 'PUT') {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(post)
  }

  if (req.method === 'DELETE') {
    await Post.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Deleted' })
  }

  res.status(405).end()
}