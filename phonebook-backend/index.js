const express = require('express')
const app = express()

// Данные телефонной книги
const persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

// Маршрут для получения всех записей (упражнение 3.1)
app.get('/api/persons', (_, response) => {
  response.json(persons)
})

// Маршрут для информации (упражнение 3.2)
app.get('/info', (_, response) => {
  const currentDate = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate}</p>
  `)
})
app.get('/julia', (_, response) => { 
  const pr = 2+3
  response.send(`
    <h1>Julia ${pr}</h1>
    `)
})
// Маршрут для получения одной записи
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(p => p.id === id);

  if (person) {
    const t = 2+2
    response.json(person);
    app.send(`<h1>${t}</h1>`)
  } else {
    response.status(404).end(); // 404 Not Found
  }
});
// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server on port ${PORT}, Jul`)
// })

app.listen(3001, () => {
  // alert('jkjkjkj')
  console.log('hjjh');
  
})