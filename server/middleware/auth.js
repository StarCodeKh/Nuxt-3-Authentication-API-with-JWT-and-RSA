import { verifyToken } from '../utils/jwt'

export default defineEventHandler((event) => {
  const url = event.node.req.url
  const urlWithoutQuery = url.split('?')[0]

  const publicRoutes = ['/api/auth/register', '/api/auth/login']
  const isPublic = publicRoutes.some(route => urlWithoutQuery.startsWith(route))

  if (isPublic) return

  const auth = getHeader(event, 'authorization')

  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Token required or invalid format' })
  }

  const token = auth.split(' ')[1]

  try {
    event.context.user = verifyToken(token)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})