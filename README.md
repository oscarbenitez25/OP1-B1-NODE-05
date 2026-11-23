# Gestor de tasques - API REST

API REST feta amb **Node.js**, **Express**, **MongoDB** i **Mongoose** per gestionar tasques: crear-les, consultar-les, actualitzar-les i eliminar-les.

## Requisits

- [Node.js](https://nodejs.org/) (versió 18 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) en marxa en local
  - Windows: el servei `MongoDB` s'inicia des de *Serveis* o amb `net start MongoDB` (terminal com a administrador)
  - Linux: `sudo systemctl start mongod`
  - macOS (Homebrew): `brew services start mongodb-community`
- [Postman](https://www.postman.com/) per provar l'API

## Instal·lació i arrencada

1. Clonar el repositori i entrar a la carpeta:
   ```bash
   git clone https://github.com/oscarbenitez25/OP1-B1-NODE-05.git
   cd OP1-B1-NODE-05
   ```
2. Instal·lar les dependències:
   ```bash
   npm install
   ```
3. Crear el fitxer `.env` a partir de l'exemple:
   ```bash
   cp .env.example .env
   ```
   (a Windows PowerShell: `copy .env.example .env`)

   Contingut del fitxer:
   ```
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
   ```
4. Arrencar el projecte:
   ```bash
   npm run dev
   ```
   Això l'inicia amb nodemon, que reinicia el servidor en cada canvi. També es pot arrencar amb `npm start`.

   El servidor queda disponible a `http://localhost:3000`.

## Estructura del projecte

```
OP1-B1-NODE-05/
├── controllers/
│   └── taskController.js    # Lògica de les operacions CRUD
├── models/
│   └── Task.js              # Model de dades (Mongoose)
├── postman/
│   └── gestor-tasques.postman_collection.json
├── routes/
│   └── taskRoutes.js        # Definició de les rutes
├── app.js                   # Configuració d'Express (middleware i rutes)
├── index.js                 # Punt d'entrada: connecta amb MongoDB i inicia el servidor
├── .env.example             # Exemple de variables d'entorn
├── .gitignore
├── package.json
└── README.md
```

## Model Task

| Camp | Tipus | Notes |
|---|---|---|
| `title` | String | Obligatori |
| `description` | String | Opcional |
| `cost` | Number | Obligatori, no pot ser negatiu |
| `hours_estimated` | Number | Obligatori, no pot ser negatiu |
| `hours_real` | Number | Opcional, no pot ser negatiu |
| `image` | String | Opcional (URL o ruta d'una imatge) |
| `completed` | Boolean | Per defecte `false` |
| `finished_at` | Date | S'assigna automàticament en completar la tasca; torna a `null` si es desmarca |
| `createdAt` | Date | Automàtic, data de creació |

## Rutes de l'API

| Mètode | Ruta | Descripció |
|---|---|---|
| POST | `/api/tasks` | Crear una nova tasca |
| GET | `/api/tasks` | Obtenir totes les tasques |
| GET | `/api/tasks/:id` | Obtenir una tasca pel seu ID |
| PUT | `/api/tasks/:id` | Actualitzar una tasca (qualsevol camp) |
| DELETE | `/api/tasks/:id` | Eliminar una tasca |

`:id` és l'`_id` que genera MongoDB, que apareix a la resposta del POST o del GET.

## Comportament de `finished_at`

- Si una tasca es **crea** amb `completed: true`, es guarda automàticament la data de finalització.
- Si una tasca no completada es **marca com a completada** (PUT), es guarda la data actual a `finished_at`.
- Si una tasca completada es **torna a marcar com a no completada**, `finished_at` torna a ser `null`.

## Exemples de peticions

### Crear una tasca (POST `/api/tasks`)

```json
{
  "title": "Dissenyar una pàgina web",
  "description": "Crear una pàgina web responsiva amb HTML, CSS i JavaScript",
  "cost": 500,
  "hours_estimated": 20,
  "image": "https://example.com/images/task1.jpg"
}
```

### Actualitzar una tasca (PUT `/api/tasks/:id`)

```json
{
  "completed": true,
  "hours_real": 15,
  "image": "https://example.com/images/updated_task.jpg"
}
```

A les peticions GET i DELETE, el Body de Postman ha d'estar a *none*.

## Codis de resposta

| Codi | Significat |
|---|---|
| `200` | Operació correcta |
| `201` | Tasca creada |
| `400` | Dades no vàlides (falta `title` o `cost`, valors negatius...) o ID amb format incorrecte |
| `404` | Tasca no trobada |
| `500` | Error del servidor |

## Col·lecció de Postman

La col·lecció és a `postman/gestor-tasques.postman_collection.json`. Per utilitzar-la, importa-la a Postman (*Import*). Conté 7 peticions amb la resposta desada com a *Example*:

1. POST: crear una tasca correcta (201)
2. POST: crear una tasca sense `title` o sense `cost` (400)
3. GET: obtenir totes les tasques
4. GET: obtenir una tasca pel seu ID
5. GET: obtenir una tasca amb un ID que no existeix (404)
6. PUT: marcar una tasca com a completada (es veu `finished_at`)
7. DELETE: eliminar una tasca

## Tecnologies

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors
- nodemon (desenvolupament)
