// server/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: String,
  roles: [String],
  assigned: [{ role: String, playerId: String }],
});

module.exports = mongoose.model('Game', gameSchema);
