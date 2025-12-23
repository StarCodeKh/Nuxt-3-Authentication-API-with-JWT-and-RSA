import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

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