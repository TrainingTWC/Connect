require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client for GitHub Models
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // GitHub Personal Access Token
  baseURL: process.env.OPENAI_BASE_URL || 'https://models.inference.ai.azure.com',
});

// Chat endpoint for real-time conversation
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set in environment variables.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are ConnectAI, an expert AI HR assistant for Third Wave Coffee (TWC). Be friendly, empathetic, and professional. Ask open-ended questions to understand the employee experience. Keep responses short and conversational.'
        },
        {
          role: 'user',
          content: req.body.message
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });
    
    res.json({ 
      response: response.choices[0].message.content 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REST endpoint for sentiment analysis
app.post('/api/analyze', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set in environment variables.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a sentiment analysis expert. Analyze the conversation and provide a detailed sentiment analysis with overall sentiment, summary, and key points.'
        },
        {
          role: 'user',
          content: req.body.conversation
        }
      ],
      temperature: 0.3
    });
    
    res.json({ 
      analysis: response.choices[0].message.content 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
