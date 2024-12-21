import express from 'express';
import { addRecipe, getRecipes } from '../Controller/recipeController.js';

const router = express.Router();

router.post('/recipes', addRecipe);
router.get('/recipes', getRecipes);

export default router;
