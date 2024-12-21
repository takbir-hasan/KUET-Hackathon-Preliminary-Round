import express from 'express';
import { chatWithBot } from '../Controller/chatbotController.js';

const router = express.Router();

router.post('/chat', chatWithBot);

export default router;
