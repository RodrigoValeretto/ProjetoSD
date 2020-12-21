const path = require('path')
const crypto = require('crypto')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

// Get env variables
const envPath = path.join(__dirname, './', 'env', '.env')
require('dotenv').config({ path: envPath })

const storageTypes = {
  // Storage in localhost
  dev: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)
        file.key = `${hash.toString('hex')}-${file.originalname}`
        cb(null, file.key)
      })
    }
  }),

  // Storage in Amazon S3
  s3: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err)cb(err)
        const filename = `${hash.toString('hex')}-${file.originalname}`
        cb(null, filename)
      })
    }
  })
}

// File middleware configs
module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],

  // Size limit block
  limits: {
    fileSize: 1 * 1024 * 1024 // 1MB
  },

  // Type file permissioned
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ]

    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Invalid value type.'))
  }
}
