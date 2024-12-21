import express from 'express';
import { createIngredient, getIngredients } from '../Controller/ingredientController.js';

const router = express.Router();

router.post('/ingredients', createIngredient);
router.get('/ingredients', getIngredients);

export default router;
