const mongoose = require('mongoose')
if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
const url = process.env.MONGODB_URI
//const url = 'mongodb+srv://Liubov:Reminders1004@clusterliubov.mfzvr.mongodb.net/reminders_utu?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
const Reminder = mongoose.model('Reminder', {
  name: String,
  date: Date
  })
  module.exports = Reminder