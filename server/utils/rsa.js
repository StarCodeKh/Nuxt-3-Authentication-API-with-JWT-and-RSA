// server/utils/rsa.js
import fs from 'fs'
import crypto from 'crypto'
import path from 'path'

const privateKey = fs.readFileSync(
  path.resolve('storage/rsa/private.pem'),
  'utf8'
)

export function decryptPassword(encrypted) {
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(encrypted, 'base64')
  ).toString()
}