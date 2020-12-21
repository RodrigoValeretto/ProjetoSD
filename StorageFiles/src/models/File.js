// Table access in MongoDB
const mongoose = require('mongoose')
const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

// Table fields
const FileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  type: String,
  createdAt: { type: Date, default: Date.now }
})

// Middleware do MongoDB before insert
FileSchema.pre('save', function () {
  if (!this.url) this.url = `${process.env.APP_URL}/files/${this.key}`
})

// Middleware do MongoDB before delete
FileSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return new AWS.S3().deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: this.key
    }).promise()
  } else return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
})

module.exports = mongoose.model('File', FileSchema)
