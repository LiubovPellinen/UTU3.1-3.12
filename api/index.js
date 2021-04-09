const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.json());
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
let reminders= [
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
  ]
  const getRandomId = () =>{
    
    return Math.floor(Math.random() * (31995) + 6); 
  }

  app.post('/api/reminders', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({error: 'name is missing'})
    }
    if (body.date === undefined) {
        return response.status(400).json({error: 'date and time are missing'})
      }
    let notunique=reminders.find(reminder => reminder.name.toUpperCase() === body.name.toUpperCase() && reminder.date==body.date)
    if(notunique){
        return response.status(400).json({error: 'this task already exists'}) 
    }
  
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
  })

  app.get('/api/reminders/:id', (request, response) => {
    const id = Number(request.params.id)
    const reminder = reminders.find(reminder => reminder.id === id)
  
    if ( reminder ) {
      response.json(reminder)
    } else {
      response.status(404).end()
    }
  })
  app.delete('/api/reminders/:id', (request, response) => {
    const id = Number(request.params.id)
    reminders = reminders.filter(reminder => reminder.id !== id)
    response.status(204).end()
  })

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})