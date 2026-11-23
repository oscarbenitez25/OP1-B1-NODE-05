// app.js
// Configuració principal de l'aplicació Express (middleware i rutes).

const express = require('express');
const cors = require('cors');

const app = express(); // Inicialitzar Express

// Middleware per gestionar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware per analitzar JSON i formularis URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta inicial de prova
app.get('/', (req, res) => {
  res.json({ message: 'Gestor de tasques en funcionament!' });
});

// Importar rutes
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/tasks', taskRoutes); // Rutes de tasques (MongoDB)

module.exports = app; // Exportar l'aplicació
