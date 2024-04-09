const Fellow = require('../model/Fellow');

/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

const serveFellows = (req, res) => {
  const fellowsList = Fellow.list();
  res.send(fellowsList);
}

const serveFellow = (req, res) => {
  const { id } = req.params;
  const fellow = Fellow.find(Number(id));
  if (!fellow) return res.status(404).send(`No fellow with the id ${id}`);
  res.send(fellow);
};

const createFellow = (req, res) => {
  const { fellowName } = req.body; // The POST request body will be an object: `{ fellowName: 'name' }`
  const newFellow = new Fellow(fellowName);
  res.send(newFellow);
};

const updateFellow = (req, res) => {
  const { fellowName } = req.body;
  const { id } = req.params;
  const updatedFellow = Fellow.editName(Number(id), fellowName);
  // sendStatus sends just the status with no message body
  if (!updatedFellow) return res.sendStatus(404);
  res.send(updatedFellow);
}

const deleteFellow = (req, res) => {
  const { id } = req.params;
  const didDelete = Fellow.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

module.exports = {
  serveFellows,
  serveFellow,
  createFellow,
  updateFellow,
  deleteFellow
};