# Gestor de tasques - API REST

API REST feta amb **Node.js**, **Express**, **MongoDB** i **Mongoose** per gestionar tasques (crear, consultar, actualitzar i eliminar).

## Requisits

- Node.js
- MongoDB en marxa. En Linux: `sudo systemctl start mongod`

## Instal·lació i arrencada

1. Clonar el repositori i entrar a la carpeta:
   ```bash
   git clone <url-del-repositori>
   cd gestor-tasques
   ```
2. Instal·lar les dependències:
   ```bash
   npm install
   ```
3. Crear el fitxer `.env` a partir de l'exemple:
   ```bash
   cp .env.example .env
   ```
   Contingut:
   ```
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
   ```
4. Arrencar el projecte amb nodemon:
   ```bash
   npm run dev
   ```
   (o `npm start` per arrencar-lo normalment). El servidor s'inicia a `http://localhost:3000`.

## Estructura

```
gestor-tasques/
├── models/Task.js                    # Model de dades (Mongoose)
├── controllers/taskController.js     # Lògica de les operacions
├── routes/taskRoutes.js              # Rutes de l'API
├── postman/gestor-tasques.postman_collection.json
├── app.js                            # Configuració d'Express
├── index.js                          # Punt d'entrada
├── .env.example
└── .gitignore
```

## Model Task

| Camp | Tipus | Notes |
|---|---|---|
| title | String | Obligatori |
| description | String | Opcional |
| cost | Number | Obligatori, no negatiu |
| hours_estimated | Number | Obligatori, no negatiu |
| hours_real | Number | Opcional, no negatiu |
| image | String | Opcional (URL o ruta) |
| completed | Boolean | Per defecte `false` |
| finished_at | Date | S'assigna en completar la tasca; `null` si no està completada |
| createdAt | Date | Automàtic (data actual) |

## Rutes

| Mètode | Ruta | Descripció |
|---|---|---|
| POST | /api/tasks | Crear una tasca |
| GET | /api/tasks | Obtenir totes les tasques |
| GET | /api/tasks/:id | Obtenir una tasca pel seu ID |
| PUT | /api/tasks/:id | Actualitzar una tasca |
| DELETE | /api/tasks/:id | Eliminar una tasca |

## Codis de resposta

- `201`: tasca creada
- `200`: operació correcta
- `400`: dades no vàlides (per exemple, falta `title` o `cost`) o ID amb format incorrecte
- `404`: tasca no trobada
- `500`: error del servidor

## Exemple de body (POST)

```json
{
  "title": "Dissenyar una pàgina web",
  "description": "Crear una pàgina web responsiva amb HTML, CSS i JavaScript",
  "cost": 500,
  "hours_estimated": 20,
  "image": "https://example.com/images/task1.jpg"
}
```

## Postman

La col·lecció està a `postman/gestor-tasques.postman_collection.json` (importar-la a Postman).
En les peticions GET i DELETE, el Body ha d'estar a *none*.
