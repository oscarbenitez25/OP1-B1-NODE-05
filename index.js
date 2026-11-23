// index.js
// Punt d'entrada del projecte:
// carrega les variables d'entorn, connecta amb MongoDB i inicia el servidor.

// Carregar variables d'entorn (quiet: true evita el missatge informatiu de dotenv)
require('dotenv').config({ quiet: true });

// Importar llibreries necessàries
const mongoose = require('mongoose'); // Llibreria per connectar amb MongoDB
const app = require('./app'); // Importem la configuració de l'aplicació Express

// Si el .env no defineix el port, s'utilitza el 3000
const PORT = process.env.PORT || 3000;

// Connectar amb MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connexió a MongoDB establerta');

    // Iniciar el servidor només quan la connexió s'ha establert
    app.listen(PORT, () => {
      console.log(`Servidor en funcionament a http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error connectant a MongoDB:', err.message));
