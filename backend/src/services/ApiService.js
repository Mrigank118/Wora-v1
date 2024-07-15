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

export async function AdaptedContent_twitter(promptResponse) {
    const defaultText = 'Make it for twitter, Strictly 20 words';

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


export async function AdaptedContent_instagram(promptResponse) {
    const defaultText = 'Make it for instagram stories, Strictly 6 to 8 words';

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

export async function AdaptedContent_linkedin(promptResponse) {
    const defaultText = 'Make it for Linkedin a little formal with and professional. 100-200 words at max, Strictly avoid providing formatters like # or **';

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


export async function AdaptedContent_medium(promptResponse) {
    const defaultText = 'Make it for medium blog, add a blogger style to it can be of any length';

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