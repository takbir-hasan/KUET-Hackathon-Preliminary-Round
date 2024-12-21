import Recipe from '../Models/Recipe.js';

// Add a new recipe
export const addRecipe = async (req, res) => {
  try {
    const { name, description, ingredients, taste, cuisine, preparationTime, image } = req.body;
    const newRecipe = new Recipe({ name, description, ingredients, taste, cuisine, preparationTime, image });
    await newRecipe.save();
    res.status(201).send(newRecipe);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add recipe' });
  }
};

// Get all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve recipes' });
  }
};
