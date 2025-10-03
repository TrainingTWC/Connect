import { OpenAI } from 'openai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set in environment variables.' });
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: process.env.OPENAI_BASE_URL || 'https://models.inference.ai.azure.com',
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a sentiment analysis expert for HR. Analyze the conversation and provide a detailed sentiment analysis with overall sentiment (positive/negative/neutral), key emotions detected, and actionable insights for HR. Be concise but thorough.'
        },
        {
          role: 'user',
          content: req.body.text || req.body.conversation || 'No conversation provided'
        }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    res.json({
      analysis: response.choices[0].message.content,
      timestamp: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString(),
      status: 'error'
    });
  }
}