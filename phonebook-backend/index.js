const express = require('express')
const app = express()

app.use(express.json()) // Добавляем парсинг JSON
app.use(express.static('public')); 
// Меняем const на let, чтобы можно было изменять массив
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]
app.post('/api/persons', (req, res) => { 
  const generId = ()=> Math.floor(Math.random() * 1000).toString()
  const body = req.body
  if (!body.name || !body.number) { 
    return res.status(400).json({ err: '!body.name || !body.number'})
  }
  if (persons.some(p => p.name === body.name)) { 
    return res.status(400).json({err: 'already have this name'})
  }

  const pers = {
      id: generId(),
      name: body.name,
      number: body.number
    }
  

  persons.push(pers)
  res.json(pers)
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
// Маршрут для получения одной записи
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(p => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end(); // 404 Not Found
  }
});

// Исправленный DELETE-обработчик
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
   console.log('Текущие записи ДО удаления:', persons)
  const initialLength = persons.length
   console.log('Текущие записи ПОСЛЕ удаления:', persons)
  // Фильтруем массив, оставляя только записи с несовпадающим ID
  persons = persons.filter(p => p.id !== id)

  if (persons.length < initialLength) {
    console.log(`Запись с ID ${id} успешно удалена`)
    response.status(204).end()
  } else {
    console.log(`Запись с ID ${id} не найдена`)
    response.status(404).end()
  }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001')
})