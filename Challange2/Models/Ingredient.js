import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
