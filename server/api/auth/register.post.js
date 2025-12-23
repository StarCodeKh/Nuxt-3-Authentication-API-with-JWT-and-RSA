import bcrypt from 'bcryptjs'
import { db } from '../../db/mysql'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)
  const hash = await bcrypt.hash(password, 10)

  await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hash]
  )

  return { message: 'User registered successfully' }
})