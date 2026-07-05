import Groq from 'groq-sdk';
import { PULSE_PROMPT } from '../src/lib/prompts.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { themes } = req.body;

    if (!themes || !Array.isArray(themes)) {
      return res.status(400).json({ error: 'Themes array is required' });
    }

    // Calculate week range
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    const weekRange = `${formatDate(weekStart)} - ${formatDate(today)}, ${today.getFullYear()}`;

    // Replace placeholders in prompt
    const prompt = PULSE_PROMPT
      .replace('{{WEEK_PLACEHOLDER}}', weekRange)
      .replace('{{THEMES_PLACEHOLDER}}', JSON.stringify(themes, null, 2));

    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (parseError) {
      console.error('Groq response parsing failed:', content);
      return res.status(502).json({ error: 'AI analysis failed, please try again' });
    }

    res.status(200).json(parsedResponse);

  } catch (error) {
    console.error('Pulse generation error:', error);
    res.status(500).json({ error: 'Failed to generate pulse' });
  }
}
