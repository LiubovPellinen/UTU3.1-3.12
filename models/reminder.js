const mongoose = require('mongoose')
const url = 'mongodb+srv://Liubov:Reminders1004@clusterliubov.mfzvr.mongodb.net/reminders_utu?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
const Reminder = mongoose.model('Reminder', {
  name: String,
  date: Date
  })
  module.exports = Reminder