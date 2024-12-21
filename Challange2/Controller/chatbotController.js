import Recipe from '../Models/Recipe.js';
import Ingredient from '../Models/Ingredient.js';
import axios from 'axios';
import ora from 'ora';
import chalk from 'chalk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const spinner = ora();
const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

// Configuration for Gemini model
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

// Get the Gemini model for text generation
const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-pro', 
  geminiConfig,
});

// Fetch data from the database and integrate with Gemini AI text generation
export const chatWithBot = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).send({ error: 'Message is required' });
    }

    spinner.start(chalk.blue('Waiting for the AI response...'));

    let aiReply = 'Sorry, I could not understand that.';

    // Example logic to search for recipes based on ingredients or message
    if (userMessage.toLowerCase().includes('recipe') || userMessage.toLowerCase().includes('ingredients')) {
      // Fetch recipes or ingredients from the database
      const recipes = await Recipe.find({ name: new RegExp(userMessage, 'i') });

      if (recipes.length > 0) {
        aiReply = `Here are some recipes related to "${userMessage}":\n`;
        recipes.forEach(recipe => {
          aiReply += `- ${recipe.name}: ${recipe.description}\n`;
          aiReply += `  Taste: ${recipe.taste || 'N/A'}\n`;
          aiReply += `  Cuisine: ${recipe.cuisine || 'N/A'}\n`;
          aiReply += `  Preparation Time: ${recipe.preparationTime || 'N/A'}\n`;
          aiReply += `  Image: ${recipe.image ? recipe.image : 'No image available'}\n`;
        });
      } else {
        aiReply = `Sorry, I couldn't find any recipes related to "${userMessage}".`;
      }
    } else if (userMessage.toLowerCase().includes('ingredient')) {
      const ingredients = await Ingredient.find({ name: new RegExp(userMessage, 'i') });

      if (ingredients.length > 0) {
        aiReply = `Here are some ingredients related to "${userMessage}":\n`;
        ingredients.forEach(ingredient => {
          aiReply += `- ${ingredient.name}: ${ingredient.quantity}\n`;
        });
      } else {
        aiReply = `Sorry, I couldn't find any ingredients related to "${userMessage}".`;
      }
    }

    // If no recipes or ingredients are found, use Gemini AI to generate a response
    if (aiReply.includes('Sorry')) {
      try {
        console.log(chalk.blue('Requesting text generation from Gemini AI...'));

        // Log the prompt being sent to Gemini for debugging purposes
        console.log(chalk.cyan(`User Prompt: ${userMessage}`));

        const result = await geminiModel.generateContent(userMessage);
        const geminiReply = result.response.text();  // Get the text response from the model

        // Log the Gemini AI response
        console.log(chalk.green('Gemini AI Reply: ', geminiReply));

        aiReply = geminiReply || 'Sorry, Gemini AI could not generate a reply.';
      } catch (geminiError) {
        console.error(chalk.red('Error with Gemini API:', geminiError.message));
        aiReply = 'Sorry, there was an issue generating text from Gemini AI.';
      }
    }

    spinner.stop();
    console.log(chalk.green(`AI Reply: ${aiReply}`));
    res.status(200).send({ reply: aiReply });

  } catch (error) {
    spinner.stop();
    console.error(chalk.red('Error with chatbot or Gemini AI:'), error.message);
    res.status(500).send({ error: 'Error processing the chatbot query or generating AI text' });
  }
};

