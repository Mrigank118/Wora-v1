import { getGeminiChatCompletion, AdaptedContent, Heading, Hashtags } from "../services/ApiService.js";
import Content from "../models/content.model.js";

export const getResponse = async (req, res) => {
    const { prompt } = req.body; // Extract prompt from request body
    try {
        const content = await getGeminiChatCompletion(prompt);
        // Here you can add logic to adapt content for different platforms
        res.json({ success: true, content });
    } catch (error) {
        console.error('Error in getContent:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};


export const getAdaptedContent = async (req, res) => {
    const { responsePrompt } = req.body; // Extract prompt from request body
    try {
        const adaptedContent = await AdaptedContent(responsePrompt);
        // Here you can add logic to adapt content for different platforms
        res.json({ success: true, adaptedContent });
    } catch (error) {
        console.error('Error in adaptContent:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getHeading = async (req, res) => {
    const { responsePrompt } = req.body; // Extract heading prompt from request body
    try {
        const adaptedHeading = await Heading(responsePrompt);
        // Here you can add logic to further process or adapt the heading
        res.json({ success: true, adaptedHeading });
    } catch (error) {
        console.error('Error in adaptHeading:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getHashtags = async (req, res) => {
    const { responsePrompt } = req.body; // Extract hashtags prompt from request body
    try {
        const adaptedHashtags = await Hashtags(responsePrompt);
        // Here you can add logic to further process or adapt the hashtags
        res.json({ success: true, adaptedHashtags });
    } catch (error) {
        console.error('Error in adaptHashtags:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const saveContent = async (req, res) => {
    const { user_id, title, body, hashtags } = req.body; // Extract data from request body
    try {
        const newContent = new Content({
            user_id,
            title,
            content: body,
            tags: hashtags
        });
        const savedContent = await newContent.save();
        res.status(201).json({ success: true, content: savedContent });
    } catch (error) {
        console.error('Error in saveContent:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
 
// Function to get notes by user ID
export const getContent = async (req, res) => {
    const { user_id } = req.params;

    try {
        // Find all notes belonging to the user
        const notes = await Content.find({ user_id });

        res.json({ success: true, notes });
    } catch (error) {
        console.error('Error in getNotes:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};



