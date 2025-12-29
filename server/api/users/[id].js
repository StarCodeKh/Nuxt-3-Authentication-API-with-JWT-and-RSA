// server/api/users/[id].js
import { db } from '../../db/mysql'
import { checkAdminRole } from '../../utils/authorization'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const method = event.node.req.method
  const user = event.context.user

  if (method === 'GET') {
    // Anyone logged in can view user details
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
    // Only admins can update user info
    checkAdminRole(user)

    const { name, email, role } = await readBody(event)
    await db.query(
      'UPDATE users SET name=?, email=?, role=? WHERE id=?',
      [name, email, role, id]
    )
    return { message: 'User updated successfully' }
  }

  if (method === 'DELETE') {
    // Only admins can delete users
    checkAdminRole(user)

    await db.query('DELETE FROM users WHERE id=?', [id])
    return { message: 'User deleted successfully' }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})