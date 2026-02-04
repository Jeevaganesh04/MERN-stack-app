const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Test route FIRST - before any other routes
app.get("/api/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Server is working!" });
});

// Try to load user routes
try {
  const userRoutes = require("./routes/userRoutes");
  app.use("/api/users", userRoutes);
  console.log("✅ User routes mounted successfully");
} catch (err) {
  console.error("❌ Error loading user routes:", err);
}

// Connect to DB (after routes are set up)
const connectDB = require("./config/db");
connectDB().catch(err => {
  console.error("MongoDB connection error:", err);
});

// 404 handler - must be AFTER all routes
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    message: `Cannot ${req.method} ${req.url}`,
    note: "This route does not exist"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
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