const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.post('/', async (req, res) => {
  const { game_id } = req.body;

  if (!game_id) {
    return res.status(400).json({ error: 'game_id is required' });
  }

  try {
    const result = await Game.deleteOne({ gameId: game_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: `بازی با game_id '${game_id}' پیدا نشد.` });
    }

    res.json({ message: `بازی '${game_id}' با موفقیت ریست شد.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'خطا در ریست بازی' });
  }
});

module.exports = router;
