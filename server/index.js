const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mafiacafebaazi:baran1234%40@cluster0.n1la9xr.mongodb.net/mafiadb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));
