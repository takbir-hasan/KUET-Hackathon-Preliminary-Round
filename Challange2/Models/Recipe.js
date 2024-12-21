import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String }],
  taste: { type: String },
  cuisine: { type: String },
  preparationTime: { type: String },
  image: { type: String }, // Optional for image path
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
