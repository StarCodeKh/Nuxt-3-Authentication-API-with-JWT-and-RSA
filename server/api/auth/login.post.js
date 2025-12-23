import bcrypt from 'bcryptjs'
import { db } from '../../db/mysql'
import { decryptPassword } from '../../utils/rsa'
import { signToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const decrypted = decryptPassword(password)

  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )

  if (!rows.length) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const user = rows[0]
  const valid = await bcrypt.compare(decrypted, user.password)

  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  return {
    user: { id: user.id, name: user.name, email: user.email },
    access_token: signToken(user),
    token_type: 'Bearer',
  }
})