import Ingredient from "../Models/Ingredient.js";

// Create a new ingredient
export const createIngredient = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newIngredient = new Ingredient({ name, quantity });
    await newIngredient.save();
    res.status(201).send(newIngredient);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create ingredient' });
  }
};

// Get all ingredients
export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).send(ingredients);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve ingredients' });
  }
};
