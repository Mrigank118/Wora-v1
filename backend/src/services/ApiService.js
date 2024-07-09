import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY; // Ensure your .env file has GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(apiKey);

export async function getGeminiChatCompletion(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Replace with the actual model ID if different
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error in getGeminiChatCompletion:', error);
        throw error;
    }
}

export async function AdaptedContent(promptResponse) {
    const defaultText = 'Make the tone a little funny and make it short: Do not use your Speech ';

    try {
        const fullPrompt = defaultText + promptResponse;
        console.log('THE FULL PROMPT IS:', fullPrompt);
        const adaptedContent = await getGeminiChatCompletion(fullPrompt);
        return adaptedContent;
    } catch (error) {
        console.error('Error in getAdaptedContent:', error);
        throw error;
    }
}

export async function Hashtags(promptResponse) {
    const defaultText = "Provide only 4 hashtags in one word with no additional text.";

    try {
        const fullPrompt = defaultText + promptResponse;
        console.log('THE FULL HASHTAGS PROMPT IS:', fullPrompt);
        const adaptedHashtags = await getGeminiChatCompletion(fullPrompt);
        return adaptedHashtags;
    } catch (error) {
        console.error('Error in getHashtags:', error);
        throw error;
    }
}

export async function Heading(promptResponse) {
    const defaultText = 'Give one short Heading in simple text: ';

    try {
        const fullPrompt = defaultText + promptResponse;
        console.log('THE FULL Heading PROMPT IS:', fullPrompt);
        const adaptedHeading = await getGeminiChatCompletion(fullPrompt);
        return adaptedHeading;
    } catch (error) {
        console.error('Error in Heading:', error);
        throw error;
    }
}
