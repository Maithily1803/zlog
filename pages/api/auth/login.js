import { checkCredentials, signToken } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  if (!checkCredentials(username, password)) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = signToken({ username, role: 'admin' })
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400`)
  return res.status(200).json({ message: 'Logged in' })
}