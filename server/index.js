require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const assignRoleRoute = require('./routes/assignRole');
const resetGameRoute = require('./routes/resetGame'); // ✅ اضافه شده

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/assign-role', assignRoleRoute);
app.use('/api/reset-game', resetGameRoute); // ✅ اضافه شده

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error(err));
