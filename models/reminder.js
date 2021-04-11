const mongoose = require('mongoose')
if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
const url = process.env.MONGODB_URI
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
const Reminder = mongoose.model('Reminder', {
  name: String,
  date: Date
  })
  module.exports = Reminder