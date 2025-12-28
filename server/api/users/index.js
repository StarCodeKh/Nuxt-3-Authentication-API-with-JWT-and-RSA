// server/api/users/index.js
import { db } from '../../db/mysql'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const [rows] = await db.query(
      'SELECT id, name, email, role, created_at FROM users'
    )
    return rows
  }

  if (event.node.req.method === 'POST') {
    const { name, email, password, role = 'user' } = await readBody(event)
    const hash = await bcrypt.hash(password, 10)

    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, role]
    )

    return { message: 'User created successfully' }
  }
})