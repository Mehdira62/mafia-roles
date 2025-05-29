const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
  const gameId = req.query.game_id;
  if (!gameId) return res.status(400).send({ error: 'game_id is required' });

  const game = await Game.findOne({ gameId });
  if (!game) return res.status(404).send({ error: 'بازی یافت نشد.' });

  // برمی‌گردونیم لیست بازیکنان و نقش‌ها
  res.send({ assigned: game.assigned });
});

module.exports = router;
