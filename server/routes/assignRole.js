// server/routes/assignRole.js
const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
  const gameId = req.query.game_id;
  const playerId = req.query.player_id || Math.random().toString(36).substring(7);

  if (!gameId) return res.status(400).send({ error: 'game_id is required' });

  let game = await Game.findOne({ gameId });
  if (!game) {
    game = await Game.create({
      gameId,
      roles: [
        'رئیس مافیا', 'جلاد', 'جادوگر', 'دکتر', 'کارآگاه',
        'وارث', 'عطار', 'شهروند ساده', 'شهروند ساده', 'مضنون'
      ],
      assigned: []
    });
  }

  // اگر این بازیکن قبلاً نقش گرفته، همونو برگردون
  const alreadyAssigned = game.assigned.find(a => a.playerId === playerId);
  if (alreadyAssigned) return res.send({ role: alreadyAssigned.role });

  // فیلتر نقش‌های باقیمانده
  const remainingRoles = game.roles.filter(r => !game.assigned.some(a => a.role === r));
  if (remainingRoles.length === 0) return res.send({ message: 'نقش‌ها تمام شده‌اند.' });

  // نقش تصادفی اختصاص بده
  const selectedRole = remainingRoles[Math.floor(Math.random() * remainingRoles.length)];
  game.assigned.push({ role: selectedRole, playerId });
  await game.save();

  res.send({ role: selectedRole });
});

module.exports = router;
