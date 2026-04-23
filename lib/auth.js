import jwt from 'jsonwebtoken'

const ADMIN_USER = process.env.ADMIN_USERNAME
const ADMIN_PASS = process.env.ADMIN_PASSWORD

export function checkCredentials(username, password) {
  return username === ADMIN_USER && password === ADMIN_PASS
}

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}