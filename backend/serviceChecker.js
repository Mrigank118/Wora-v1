async function adaptContentForTwitter(text) {
    const prompt = `Adapt the following text for a Twitter post with a casual tone and a maximum of 280 characters: ${text}`;
  
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama3-8b-8192',
        max_tokens: 280, // Adjust max_tokens as per your requirement
      });
  
      console.log('API Response:', chatCompletion); // Add this line to check API response
  
      const generatedText = chatCompletion.choices[0]?.message?.content || '';
      return `Twitter adapted content: ${generatedText}`;
    } catch (error) {
      console.error('Error adapting content for Twitter:', error);
      throw error;
    }
  }
  