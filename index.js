const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.json());
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Reminder = require('./models/reminder')//  Mongoose-specific code in a separate module.()

const formatReminder = (reminder) => {
  return {
    name: reminder.name,
    date: reminder.date,
    id: reminder._id
  }
}
//this part for excercises 3.1-3.8 (without MongoDB)
/* let reminders= [
    {
      "name": "Buy some eggs",
      "date": "2021-11-10T13:00:00.141Z",
      "id": 1
    },
    {
      "name": "Make an omelette",
      "date": "2021-11-11T08:00:00.141Z",
      "id": 2
    },
    {
      "name": "Wash dishes",
      "date": "2021-11-11T09:00:00.000Z",
      "id": 3
    },
    {
      "name": "Buy more eggs",
      "date": "2021-11-11T13:00:00.000Z",
      "id": 4
    },
  ]*/

//this part for excercise 3.4
/* const getRandomId = () => {

     return Math.floor(Math.random() * (31995) + 6);
}*/

app.post('/api/reminders', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name is missing' })
  }
  if (body.date === undefined) {
    return response.status(400).json({ error: 'date and time are missing' })
  }
  // this part for excercise 3.5
  /*let notunique = reminders.find(reminder => reminder.name.toUpperCase() === body.name.toUpperCase() && reminder.date == body.date)
  if (notunique) {
  return response.status(400).json({ error: 'this task already exists' })
   }*/
  const reminder = new Reminder({
    name: body.name,
    date: body.date
  })
  reminder
    .save()
    .then(formatReminder)
    .then(savedAndFormattedReminder=>{
      response.json(savedAndFormattedReminder)
    })
    
})
//this part for excercises 3.1-3.8 (without MongoDB)
/*
  const reminder = {
    name: body.name,
    date: body.date|| new Date(),
    id: getRandomId()
  }
 
  reminders = reminders.concat(reminder)
 
  response.json(reminder)
})

 app.get('/api/reminders', (req, res) => {
  res.json(reminders)
})*/
app.get('/api/reminders', (request, response) => {
  Reminder
    .find({}, { __v: 0 })
    .then(reminders => {
      response.json(reminders.map(formatReminder))
    })
})

app.get('/api/reminders/:id', (request, response) => {
  //this part for excercises 3.1-3.8 (without MongoDB)
  /*const id = Number(request.params.id)
  const reminder = reminders.find(reminder => reminder.id === id)

  if (reminder) {
    response.json(reminder)
  } else {
    response.status(404).end()
  }*/
  Reminder
    .findById(request.params.id)
    .then(reminder => {
      if (reminder) {
        response.json(formatReminder(reminder))
      } else {
        response.status(404).end()
      }

    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})
app.delete('/api/reminders/:id', (request, response) => {
  Reminder
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
  //this part for excercises 3.1-3.8 (without MongoDB)
  /*const id = Number(request.params.id)
   reminders = reminders.filter(reminder => reminder.id !== id)
    response.status(400).send({ error: 'malformatted id' }) */
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})