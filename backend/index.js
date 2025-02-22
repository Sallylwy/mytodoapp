import taskRoutes from "./routes/tasks.js";

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Allows Express to parse JSON requests
app.use(cors()); // Enables frontend communication

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
app.use("/api", taskRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
