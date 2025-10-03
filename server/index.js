import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS to allow GitHub Pages
app.use(cors({
  origin: [
    'https://trainingtwc.github.io',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    endpoints: ['/api/chat', '/api/analyze']
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

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
