import express from 'express';
import { getContent, adaptContent, adaptHashtags, adaptHeading } from "../controllers/conent.controller.js"

const router = express.Router();

// Route for fetching content
router.post('/content', getContent);

// Route for adapting content
router.post('/adaptContent', adaptContent);

router.post('/adaptHeading', adaptHeading);
router.post('/adaptHashtags', adaptHashtags);
export default router;
