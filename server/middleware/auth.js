// server/middleware/auth.js
import { verifyToken } from '../utils/jwt'

export default defineEventHandler((event) => {
  const publicRoutes = ['/api/auth/register', '/api/auth/login']
  if (publicRoutes.some(r => event.node.req.url.startsWith(r))) return

  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Token required' })
  }

  event.context.user = verifyToken(auth.split(' ')[1])
})