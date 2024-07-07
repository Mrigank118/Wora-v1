import { getGroqChatCompletion, getAdaptedContent, getHeading, getHashtags } from "../services/ApiService.js";

export const getContent = async (req, res) => {
    const { prompt } = req.body; // Extract prompt from request body
    try {
        const content = await getGroqChatCompletion(prompt);
        // Here you can add logic to adapt content for different platforms
        res.json({ success: true, content });
    } catch (error) {
        console.error('Error in getContent:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const adaptContent = async (req, res) => {
    const { responsePrompt } = req.body; // Extract prompt from request body
    try {
        const adaptedContent = await getAdaptedContent(responsePrompt);
        // Here you can add logic to adapt content for different platforms
        res.json({ success: true, adaptedContent });
    } catch (error) {
        console.error('Error in adaptContent:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const adaptHeading = async (req, res) => {
    const { responsePrompt } = req.body; // Extract heading prompt from request body
    try {
        const adaptedHeading = await getHeading(responsePrompt);
        // Here you can add logic to further process or adapt the heading
        res.json({ success: true, adaptedHeading });
    } catch (error) {
        console.error('Error in adaptHeading:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const adaptHashtags = async (req, res) => {
    const { responsePrompt } = req.body; // Extract hashtags prompt from request body
    try {
        const adaptedHashtags = await getHashtags(responsePrompt);
        // Here you can add logic to further process or adapt the hashtags
        res.json({ success: true, adaptedHashtags });
    } catch (error) {
        console.error('Error in adaptHashtags:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

