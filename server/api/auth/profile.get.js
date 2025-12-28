// server/api/auth/profile.get.js
export default defineEventHandler((event) => {
  return event.context.user
})