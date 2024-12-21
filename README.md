# KUET-Hackathon-Preliminary-Round
# Challange 2: Mofa's Kitchen Buddy - Chatbot API
Mofa's Kitchen Buddy is a chatbot API that interacts with a database of recipes and ingredients. The bot can respond to queries about recipes and ingredients, and when relevant data is not found, it uses the Google Gemini AI for text generation. This project is built to provide an elegant and user-friendly API for seamless integration with other services.

## Features

- **Recipe Search**: Search for recipes based on ingredients or recipe names.
- **Ingredient Search**: Retrieve ingredients and their quantities from the database.
- **AI-Powered Text Generation**: If no data is found, the bot generates a response using the Google Gemini AI.
- **Database**: MongoDB stores recipe and ingredient information.
- **API Endpoints**: Several endpoints for interacting with recipes, ingredients, and chatting with the bot.

## Technologies Used
- **JavaScript**: Core programming language for building the backend.
- **Node.js**: JavaScript runtime for executing the application.
- **Express.js**: Web framework for Node.js to build APIs.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Google Gemini AI API**: AI API for integrating natural language processing (NLP) features into the chatbot.
- **Chalk**: For terminal string styling and color formatting.
- **Dotenv**: To manage environment variables.
- **Axios**: Promise-based HTTP client for making API requests.

## Installation

To get this project up and running on your local machine, follow these steps:
```bash
git clone (https://github.com/takbir-hasan/KUET-Hackathon-Preliminary-Round.git)

## Install
Install the necessary dependencies using npm:
npm install

# Set Up Environment Variables
MONGO_URI=<Your MongoDB Connection URI>
GEMINI_API_KEY=<Your Gemini API Key>


#Start the Application
npm start
The server will be running on http://localhost:5000.


## API Endpoints

1. POST: /api/chatbot/chat: Chat with the bot by sending a message.)
Request Body:
{
  "message": "Your message here"
}

2. GET and POST:  /api/recipes
Response:
[
  {
    "name": "Recipe Name",
    "description": "Description",
    "ingredients": ["ingredient1", "ingredient2"],
    "taste": "Taste",
    "cuisine": "Cuisine",
    "preparationTime": "Time",
    "image": "Image URL"
  },
  ...
]

Request Body:
{
  "name": "Recipe Name",
  "description": "Recipe Description",
  "ingredients": ["ingredient1", "ingredient2"],
  "taste": "Taste",
  "cuisine": "Cuisine",
  "preparationTime": "Time",
  "image": "Image URL"
}

3. GET and POST : /api/ingredients
Response: 
[
  {
    "name": "Ingredient Name",
    "quantity": "Quantity"
  },
  ...
]

Request Body:
{
  "name": "Ingredient Name",
  "quantity": "Quantity"
}

