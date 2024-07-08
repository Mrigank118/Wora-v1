import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey });

export async function getGroqChatCompletion(prompt) {
    try {
        const response = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'mixtral-8x7b-32768',
        });
        return response.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('Error in getGroqChatCompletion:', error);
        throw error;
    }
}

export async function AdaptedContent(promptResponse) {
    // Define your default text to prepend to the user's prompt
    const defaultText = 'Make the tone a little funny and make it short: Do not use your Speech  ';

    try {

        // Concatenate the default text with the user's prompt
        const fullPrompt = defaultText + promptResponse;

        console.log('THE FULL PROMPT IS:', fullPrompt);

        // Get the response from the AI service using the full prompt
        const adaptedContent = await getGroqChatCompletion(fullPrompt);

        return adaptedContent;
    } catch (error) {
        console.error('Error in getAdaptedContent:', error);
        throw error;
    }
}
export async function Hashtags(promptResponse) {
    // Define your default text to prepend to the user's prompt
    const defaultText = "Provide only 4 hashtags in one word with no additional text."
;

    try {
        // Concatenate the default text with the user's prompt
        const fullPrompt = defaultText + promptResponse;

        console.log('THE FULL HASHTAGS PROMPT IS:', fullPrompt);

        // Get the response from the AI service using the full prompt
        const adaptedHashtags = await getGroqChatCompletion(fullPrompt);

        return adaptedHashtags;
    } catch (error) {
        console.error('Error in getHashtags:', error);
        throw error;
    }
}


export async function Heading(promptResponse) {
    // Define your default text to prepend to the user's prompt
    const defaultText = 'Give one short Heading in simple text: ';

    try {
        // Concatenate the default text with the user's prompt
        const fullPrompt = defaultText + promptResponse;

        console.log('THE FULL Heading PROMPT IS:', fullPrompt);

        // Get the response from the AI service using the full prompt
        const adaptedHashtags = await getGroqChatCompletion(fullPrompt);

        return adaptedHashtags;
    } catch (error) {
        console.error('Error in Heading:', error);
        throw error;
    }
}
