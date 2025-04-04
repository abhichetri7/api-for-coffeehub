import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './src/routes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://connect:connect@cluster0.vg6c7an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api', router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});