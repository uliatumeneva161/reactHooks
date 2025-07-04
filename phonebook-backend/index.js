// =============================================
// 1. ИНИЦИАЛИЗАЦИЯ И НАСТРОЙКА ПРИЛОЖЕНИЯ
// =============================================
const express = require('express');
const app = express();

// Включаем middleware для парсинга JSON в запросах
app.use(express.json());

// =============================================
// 2. БАЗА ДАННЫХ (В ПАМЯТИ)
// =============================================

// Используем let, так как массив будет изменяться
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// =============================================
// 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =============================================

// Генератор уникального ID
const generateId = () => {
  const maxId = 1000000;
  return Math.floor(Math.random() * maxId).toString();
};

// =============================================
// 4. МАРШРУТЫ (ROUTES)
// =============================================

// ---------------------------
// 4.1. Получить все записи
// ---------------------------
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// ---------------------------
// 4.2. Получить одну запись по ID
// ---------------------------
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  
  if (person) {
    res.json(person);
  } else {
    res.status(404).end(); // 404 Not Found
  }
});

// ---------------------------
// 4.3. Удалить запись по ID
// ---------------------------
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const initialLength = persons.length;
  
  persons = persons.filter(p => p.id !== id);
  
  if (persons.length < initialLength) {
    res.status(204).end(); // 204 No Content
  } else {
    res.status(404).end(); // 404 Not Found
  }
});

// ---------------------------
// 4.4. Добавить новую запись
// ---------------------------
app.post('/api/persons', (req, res) => {
  const body = req.body;
  
  // Проверка на наличие данных
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'Не указано имя или номер' 
    });
  }
  
  // Проверка на уникальность имени
  if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({ 
      error: 'Имя должно быть уникальным' 
    });
  }
  
  // Создаем новую запись
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  };
  
  persons.push(person);
  res.status(201).json(person); // 201 Created
});

// ---------------------------
// 4.5. Информация о телефонной книге
// ---------------------------
app.get('/info', (req, res) => {
  const currentDate = new Date();
  res.send(`
    <p>В телефонной книге ${persons.length} записей</p>
    <p>${currentDate}</p>
  `);
});

// =============================================
// 5. ЗАПУСК СЕРВЕРА
// =============================================

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});