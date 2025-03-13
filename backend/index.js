import taskRoutes from "./routes/tasks.js";
import Task from "./models/task.js";

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Allows Express to parse JSON requests
app.use(cors({
  origin: 'https://my-ideaspark.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

// Add OPTIONS handling
app.options('*', cors());  // Enable pre-flight for all routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
app.use("/api/tasks", taskRoutes);
app.post("/api/tasks", async (req, res) => {
  try {
    console.log('Received task request:', req.body);
    const task = new Task({
      text: req.body.text,
      completed: false,
      description: ""
    });
    const savedTask = await task.save();
    console.log('Saved task:', savedTask);
    res.json(savedTask);
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add a test GET route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    console.log('Sending tasks:', tasks);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
