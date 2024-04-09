const express = require('express');
const path = require('path');

// Instead of defining all of the controllers here, we've moved them to their own folder
const {
  serveSongs,
  serveSong,
  createSong,
  updateSong,
  deleteSong
} = require('./controllers/songControllers');

const app = express();

////////////////////////
// Middleware
////////////////////////

const pathToFrontendDist = path.join(__dirname, '..', 'frontend', 'dist');
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
// Endpoints
////////////////////////

app.get('/api/songs', serveSongs);
app.get('/api/songs/:id', serveSong);
app.post('/api/songs', createSong);
app.patch('/api/songs/:id', updateSong);
app.delete('/api/songs/:id', deleteSong);
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});



const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));