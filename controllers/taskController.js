// controllers/taskController.js
// Lògica de les operacions CRUD de les tasques.
// Les dades es guarden a MongoDB amb Mongoose (no s'utilitza cap array simulat).

const Task = require('../models/Task'); // Importem el model

// Crear una nova tasca
exports.createTask = (req, res) => {
  const { title, description, cost, hours_estimated, hours_real, image, completed } = req.body ?? {};

  // Crear la tasca amb les dades del cos de la petició
  const task = new Task({ title, description, cost, hours_estimated, hours_real, image, completed });

  // Si la tasca es crea ja completada, guardem la data de finalització
  if (completed === true) {
    task.finished_at = new Date();
  }

  task
    .save() // Guardar la tasca a la base de dades
    .then(savedTask => {
      res.status(201).json(savedTask); // Retornar la tasca creada
    })
    .catch(err => {
      // Falta title o cost, valors negatius, etc.
      res.status(400).json({ error: "No s'ha pogut crear la tasca", details: err.message });
    });
};

// Obtenir totes les tasques
exports.getTasks = (req, res) => {
  Task.find() // Obtenir totes les tasques de la base de dades
    .then(tasks => {
      res.status(200).json(tasks); // Retornar les tasques
    })
    .catch(err => {
      res.status(500).json({ error: 'Error obtenint les tasques', details: err.message });
    });
};

// Obtenir una tasca pel seu ID
exports.getTaskById = (req, res) => {
  Task.findById(req.params.id) // Buscar la tasca per ID
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }
      res.status(200).json(task); // Retornar la tasca
    })
    .catch(err => {
      const status = err.name === 'CastError' ? 400 : 500; // ID amb format incorrecte → 400
      res.status(status).json({ error: 'Error obtenint la tasca', details: err.message });
    });
};

// Actualitzar una tasca
exports.updateTask = (req, res) => {
  const body = req.body ?? {};

  Task.findById(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }

      // Actualitzem només els camps que arriben al cos de la petició
      const camps = ['title', 'description', 'cost', 'hours_estimated', 'hours_real', 'image'];
      camps.forEach(camp => {
        if (body[camp] !== undefined) {
          task[camp] = body[camp];
        }
      });

      // Gestió de l'estat completed i la data de finalització (finished_at)
      if (body.completed !== undefined) {
        if (body.completed === true && !task.completed) {
          task.finished_at = new Date(); // Passa a completada: guardem la data
        } else if (body.completed === false) {
          task.finished_at = null; // Torna a no completada: finished_at a null
        }
        task.completed = body.completed;
      }

      // save() aplica també les validacions de l'esquema
      return task.save().then(updatedTask => {
        res.status(200).json(updatedTask); // Retornar la tasca actualitzada
      });
    })
    .catch(err => {
      const status = (err.name === 'CastError' || err.name === 'ValidationError') ? 400 : 500;
      res.status(status).json({ error: 'Error actualitzant la tasca', details: err.message });
    });
};

// Eliminar una tasca
exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.id) // Eliminar la tasca
    .then(deletedTask => {
      if (!deletedTask) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }
      res.status(200).json({ message: 'Tasca eliminada amb èxit', task: deletedTask });
    })
    .catch(err => {
      const status = err.name === 'CastError' ? 400 : 500; // ID amb format incorrecte → 400
      res.status(status).json({ error: 'Error eliminant la tasca', details: err.message });
    });
};
