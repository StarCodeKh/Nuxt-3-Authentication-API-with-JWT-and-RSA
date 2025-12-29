// server/utils/authorization.js
export function checkAdminRole(user) {
  if (!user || user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admins only' })
  }
}