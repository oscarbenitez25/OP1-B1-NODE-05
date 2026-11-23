// models/Task.js
// Model de Mongoose que representa una tasca.
// MongoDB guardarà els documents a la col·lecció "tasks".

const mongoose = require('mongoose');

// Definim l'esquema de la tasca
const TaskSchema = new mongoose.Schema({
  // Títol de la tasca (obligatori)
  title: {
    type: String,
    required: [true, 'El títol de la tasca és obligatori'],
    trim: true // Elimina espais innecessaris
  },
  // Descripció de la tasca (opcional)
  description: {
    type: String,
    trim: true
  },
  // Cost estimat (obligatori i no pot ser negatiu)
  cost: {
    type: Number,
    required: [true, 'El cost és obligatori'],
    min: [0, 'El cost no pot ser negatiu']
  },
  // Previsió d'hores (obligatori i no pot ser negatiu)
  hours_estimated: {
    type: Number,
    required: [true, 'La previsió d\'hores és obligatòria'],
    min: [0, 'La previsió d\'hores no pot ser negativa']
  },
  // Hores reals invertides (opcional i no pot ser negatiu)
  hours_real: {
    type: Number,
    min: [0, 'Les hores reals no poden ser negatives']
  },
  // URL o ruta d'una imatge relacionada (opcional)
  image: {
    type: String,
    trim: true
  },
  // Indica si la tasca està completada
  completed: {
    type: Boolean,
    default: false // Per defecte, la tasca no està completada
  },
  // Data en què es completa la tasca (null si no està completada)
  finished_at: {
    type: Date,
    default: null
  },
  // Data de creació (automàtica)
  createdAt: {
    type: Date,
    default: Date.now // Per defecte, la data actual
  }
});

// Exportem el model
module.exports = mongoose.model('Task', TaskSchema);
