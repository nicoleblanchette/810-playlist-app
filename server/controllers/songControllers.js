const Song = require('../model/Song');

/* 
These controllers take incoming requests and utilize the
methods provided by the Song "model" before sending a
response back to the client (or an error message).
*/

const serveSongs = (req, res) => {
  const songsList = Song.list();
  res.send(songsList);
}

const serveSong = (req, res) => {
  const { id } = req.params;
  const song = Song.find(Number(id));
  if (!song) return res.status(404).send(`No song with the id ${id}`);
  res.send(song);
};

const createSong = (req, res) => {
  const { songTitle, songArtist } = req.body; // The POST request body will be an object: `{ songTitle: 'title' }`
  const newSong = new Song(songTitle, songArtist);
  res.send(newSong);
};

const updateSong = (req, res) => {
  const { songTitle, songArtist, songCoverImg, songSrc } = req.body;
  const { id } = req.params;
  const updatedSong = Song.editTitle(Number(id), songTitle);
  // Song.editTitle(Number(id), songTitle);
  // Song.editArtist(Number(id), songArtist);
  // Song.editCover(Number(id), songCoverImg);
  // const updatedSong = Song.editSrc(Number(id), songSrc)
  // sendStatus sends just the status with no message body
  if (!updatedSong) return res.sendStatus(404);
  res.send(updatedSong);
}

const deleteSong = (req, res) => {
  const { id } = req.params;
  const didDelete = Song.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

module.exports = {
  serveSongs,
  serveSong,
  createSong,
  updateSong,
  deleteSong
};