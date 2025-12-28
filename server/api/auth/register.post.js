// server/api/auth/register.post.js
import bcrypt from 'bcryptjs'
import { db } from '../../db/mysql'

export default defineEventHandler(async (event) => {
  const { name, email, password, role = 'user' } = await readBody(event)
  const hash = await bcrypt.hash(password, 10)

  await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hash, role]
  )

  return { message: 'User registered successfully' }
})