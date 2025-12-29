// server/api/users/index.js
import { db } from '../../db/mysql'
import bcrypt from 'bcryptjs'
import { checkAdminRole } from '../../utils/authorization'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const user = event.context.user

  if (method === 'GET') {
    // Anyone logged in can list users
    const [rows] = await db.query(
      'SELECT id, name, email, role, created_at FROM users'
    )
    return rows
  }

  if (method === 'POST') {
    // Only admins can create new users
    checkAdminRole(user)

    const { name, email, password, role = 'user' } = await readBody(event)
    const hash = await bcrypt.hash(password, 10)

    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, role]
    )

    return { message: 'User created successfully' }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})