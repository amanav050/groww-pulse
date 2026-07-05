import Groq from 'groq-sdk';
import { THEMING_PROMPT } from '../src/lib/prompts.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reviews } = req.body;

    // Validate request body
    if (!reviews || !Array.isArray(reviews)) {
      return res.status(400).json({ error: 'Invalid request: reviews array required' });
    }

    // Validate review structure
    const requiredFields = ['date', 'rating', 'title', 'review_text', 'platform'];
    for (const review of reviews) {
      for (const field of requiredFields) {
        if (!review[field]) {
          return res.status(400).json({ error: `Invalid review: missing ${field}` });
        }
      }
    }

    // Format reviews for the prompt
    const reviewsText = reviews.map(review => 
      `Date: ${review.date}\nRating: ${review.rating}/5\nTitle: ${review.title}\nReview: ${review.review_text}\nPlatform: ${review.platform}`
    ).join('\n\n---\n\n');

    // Replace placeholder in prompt
    const prompt = THEMING_PROMPT.replace('{{REVIEWS_PLACEHOLDER}}', reviewsText);

    // Call Groq API with JSON mode
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 2000
    });

    const rawResponse = response.choices[0].message.content;

    // Parse JSON response with error handling
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error('Groq JSON parsing failed:', parseError);
      console.error('Raw response:', rawResponse);
      return res.status(502).json({ error: 'AI analysis failed, please try again' });
    }

    // Validate response structure
    if (!parsedResponse.themes || !Array.isArray(parsedResponse.themes)) {
      console.error('Invalid response structure:', parsedResponse);
      return res.status(502).json({ error: 'AI analysis failed, please try again' });
    }

    // Validate each theme has required fields
    const themeFields = ['id', 'name', 'description', 'review_count', 'sentiment', 'sample_reviews'];
    for (const theme of parsedResponse.themes) {
      for (const field of themeFields) {
        if (theme[field] === undefined) {
          console.error('Missing theme field:', field, theme);
          return res.status(502).json({ error: 'AI analysis failed, please try again' });
        }
      }
    }

    return res.status(200).json(parsedResponse);

  } catch (error) {
    console.error('Theme analysis error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
