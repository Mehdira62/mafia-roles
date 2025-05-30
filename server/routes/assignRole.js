const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// نگاشت نقش‌ها به نام فایل عکس (نام‌ انگلیسی و بدون فاصله یا حرف فارسی)
const roleToImage = {
  'رئیس مافیا': 'boss-mafia.png',
  'جلاد': 'jallad.png',
  'جادوگر': 'jadogar.png',
  'دکتر': 'doctor.png',
  'کارآگاه': 'detective.png',
  'وارث': 'vares.png',
  'عطار': 'attar.png',
  'شهروند ساده1': 'simple1.png',
  'شهروند ساده2': 'simple2.png',
  'مضنون': 'suspicious.png'
};

router.get('/', async (req, res) => {
  const gameId = req.query.game_id;
  const playerId = req.query.player_id || Math.random().toString(36).substring(7);

  if (!gameId) return res.status(400).send({ error: 'game_id is required' });

  let game = await Game.findOne({ gameId });
  if (!game) {
    game = await Game.create({
      gameId,
      roles: Object.keys(roleToImage), // تمام نقش‌ها از نگاشت
      assigned: []
    });
  }

  // اگر قبلاً نقش داده شده باشد، همان نقش و تصویر را برگردان
  const alreadyAssigned = game.assigned.find(a => a.playerId === playerId);
  if (alreadyAssigned) {
    return res.send({ 
      role: alreadyAssigned.role,
      image: `/images/roles/${roleToImage[alreadyAssigned.role] || 'default.png'}`
    });
  }

  // نقش‌های باقیمانده را پیدا کن
  const remainingRoles = game.roles.filter(r => !game.assigned.some(a => a.role === r));
  if (remainingRoles.length === 0) return res.send({ message: 'نقش‌ها تمام شده‌اند.' });

  // نقش تصادفی انتخاب کن و ذخیره کن
  const selectedRole = remainingRoles[Math.floor(Math.random() * remainingRoles.length)];
  game.assigned.push({ role: selectedRole, playerId });
  await game.save();

  // نقش و تصویر مربوطه را برگردان
  res.send({ 
    role: selectedRole,
    image: `/images/roles/${roleToImage[selectedRole] || 'default.png'}`
  });
});

module.exports = router;
