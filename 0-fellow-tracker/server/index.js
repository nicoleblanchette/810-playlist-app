const express = require('express');
const path = require('path');

const pathToFrontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const app = express();

////////////////////////
// Middleware
////////////////////////

const serveStatic = express.static(pathToFrontendDist);

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// A new middleware has appeared! 
// This parses incoming requests with JSON data in the body
// Access the data using `req.body`
const parseJSON = express.json();

app.use(serveStatic); // Serve static public/ content
app.use(parseJSON);   // Parses request body JSON
app.use(logRoutes);

////////////////////////
// Controllers
////////////////////////

// The "in-memory" array. It is created and stored in RAM when the
// server application starts/restarts. It does not "persist"
const fellowsList = [
  { name: 'ben', id: 0 },
  { name: 'gonzalo', id: 1 },
  { name: 'carmen', id: 2 },
  { name: 'zo', id: 3 },
];

// app.get('/api/fellows', serveFellows);
const serveFellows = (req, res, next) => {
  res.send(fellowsList);
}

// app.get('/api/fellows/:id', serveFellow);
const serveFellow = (req, res, next) => {
  const { id } = req.params;
  const fellow = fellowsList.find((fellow) => Number(id) === fellow.id);
  if (!fellow) return res.status(404).send(`No fellow with the id ${id}`);
  res.send(fellow);
};

// app.post('/api/fellows', createFellow);
const createFellow = (req, res, next) => {
  const { fellowName } = req.body; // The POST request body will be an object: `{ fellowName: 'name' }`
  const newFellow = {
    name: fellowName,
    id: fellowsList.length
  };
  fellowsList.push(newFellow)
  res.send(newFellow);
};

// app.patch('/api/fellows/:id', updateFellow);
const updateFellow = (req, res, next) => {
  res.sendStatus(404);
}

// app.delete('/api/fellows/:id', deleteFellow);
const deleteFellow = (req, res, next) => {
  res.sendStatus(404);
}

////////////////////////
// Endpoints
////////////////////////

app.get('/api/fellows', serveFellows);
app.get('/api/fellows/:id', serveFellow);
app.post('/api/fellows', createFellow);

app.patch('/api/fellows/:id', updateFellow);
app.delete('/api/fellows/:id', deleteFellow);
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});



const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));