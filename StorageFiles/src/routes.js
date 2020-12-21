const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const File = require('./models/File')
const AWS = require('aws-sdk')

// router upload file
routes.post('/uploadFile', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = '', mimetype: type } = req.file
  const file = await File.create({
    name,
    size,
    key,
    url,
    type
  })
  return res.json(file)
})

// router list files
routes.get('/listFiles', async (req, res) => {
  const file = await File.find()
  return res.json(file)
})

// router download file
routes.get('/downloadFile/:id', async (req, res) => {
  const file = await File.findById(req.params.id)
  if (!file) return res.send('File not fount.')

  const s3 = new AWS.S3()
  s3
    .getObject({
      Bucket: process.env.AWS_BUCKET,
      Key: file.key
    })
    .on('httpHeaders', function (statusCode, headers) {
      res.set('Content-Length', headers['content-length'])
      res.set('Content-Type', headers['content-type'])
      this.response.httpResponse
        .createUnbufferedStream()
        .pipe(res)
    })
    .send()
})

// router delete file
routes.delete('/deleteFile/:id', async (req, res) => {
  const file = await File.findById(req.params.id)
  await file.remove()
  return res.send()
})

module.exports = routes
