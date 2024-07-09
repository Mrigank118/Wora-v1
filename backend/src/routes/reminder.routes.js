import express from 'express';
import {sendPersonalizedEmail } from '../controllers/reminder.controller.js'; // Adjust path as necessary

const reminderRouter = express.Router();

// POST /WORA/reminder/newsletter - Newsletter Endpoint
reminderRouter.post('/newsletter', sendPersonalizedEmail);

export default reminderRouter;
