require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes')
const mongoose = require('mongoose')

// Server instance
const app = express()

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

// Server configs
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(routes)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Server starts
app.listen(process.env.PORT || 3000)
