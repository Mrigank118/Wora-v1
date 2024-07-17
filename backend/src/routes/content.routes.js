import express from 'express';
import { getResponse, getAdaptedContent, getHeading, getHashtags, saveContent, getContent, } from '../controllers/content.controller.js';

const contentRouter = express.Router();

// Routes for content operations
contentRouter.post('/getResponse', getResponse);
contentRouter.post('/getAdaptedContent', getAdaptedContent);
contentRouter.post('/getHeading', getHeading);
contentRouter.post('/getHashtags', getHashtags);

// Route for saving notes
contentRouter.post('/saveContent', saveContent);

// Route for fetching notes
contentRouter.get('/getContent/:user_id', getContent);

export default contentRouter;