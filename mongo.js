const mongoose = require('mongoose')
const url = 'mongodb+srv://Liubov:Reminders1004@clusterliubov.mfzvr.mongodb.net/reminders_utu?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
reminder_name = ""
reminder_date = ""
if (process.argv[2] && process.argv[3]) {
    reminder_name = process.argv[2]
    reminder_date = process.argv[3]
    reminder_id = Math.floor(Math.random() * (31995) + 6)
}
const Reminder = mongoose.model('Reminder', {
    name: String,
    date: Date,
    id: Number
})

if (reminder_name !== "" && reminder_date !== "") {

    const reminder = new Reminder({
        name: reminder_name,
        date: reminder_date,
        id: reminder_id
    })

    reminder
        .save()
        .then(response => {
            console.log('Adding person Reminder "' + reminder_name + '" at ' + reminder_date + ' to the reminder database')
            mongoose.connection.close()
        })

} else {
    console.log("Reminders:")
    Reminder
        .find({})
        .then(reminders => {
            reminders.forEach(reminder => {
                console.log(reminder)
            })
            mongoose.connection.close()
        })

}