import express from 'express';
import {sendPersonalizedEmail } from '../controllers/reminder.controller.js'; // Adjust path as necessary

const reminderRouter = express.Router();

// POST /WORA/reminder/newsletter - Newsletter Endpoint
reminderRouter.post('/notify', sendPersonalizedEmail);

export default reminderRouter;
