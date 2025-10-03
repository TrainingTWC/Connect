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

  // For now, let's return a simple response to test connectivity
  try {
    const message = req.body?.message || 'Hello from frontend';
    
    res.json({
      response: `Echo: ${message} - Backend is working! OpenAI integration will be added next.`,
      timestamp: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: error.message });
  }
}