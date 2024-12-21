import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import chatbotRoutes from './Routes/chatbotRoutes.js';
import ingredientRoutes from './Routes/ingredientRoutes.js';
import recipeRoutes from './Routes/recipeRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/chatbot', chatbotRoutes);
app.use('/api', ingredientRoutes);
app.use('/api', recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
