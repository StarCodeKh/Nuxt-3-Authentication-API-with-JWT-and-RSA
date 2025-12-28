// server/api/users/[id].js
import { db } from '../../db/mysql'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const method = event.node.req.method

  if (method === 'GET') {
    const [rows] = await db.query(
      'SELECT id, name, email, role FROM users WHERE id=?',
      [id]
    )
    if (!rows.length) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }
    return rows[0]
  }

  if (method === 'PUT') {
    const { name, email, role } = await readBody(event)
    await db.query(
      'UPDATE users SET name=?, email=?, role=? WHERE id=?',
      [name, email, role, id]
    )
    return { message: 'User updated successfully' }
  }

  if (method === 'DELETE') {
    await db.query('DELETE FROM users WHERE id=?', [id])
    return { message: 'User deleted successfully' }
  }
})