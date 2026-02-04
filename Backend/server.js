const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


 app.get("/api/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Server is working!" });
});

try {
  const userRoutes = require("./routes/userRoutes");
  app.use("/api/users", userRoutes);
  console.log("✅ User routes mounted successfully");
} catch (err) {
  console.error("Error loading user routes:", err);
}


const connectDB = require("./config/db");
connectDB().catch(err => {
  console.error("MongoDB connection error:", err);
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n✅ Backend running on port ${PORT}`);
  console.log(`📍 Test the routes:`);
  console.log(`   GET    http://localhost:${PORT}/api/test`);
  console.log(`   GET    http://localhost:${PORT}/api/users`);
  console.log(`   POST   http://localhost:${PORT}/api/users`);
  console.log(`   DELETE http://localhost:${PORT}/api/users/:id\n`);
});