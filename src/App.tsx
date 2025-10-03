import React, { useState } from 'react';

// For now, let's create a simple frontend-only demo
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Temporary demo API

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // For demo purposes, let's simulate an API call
      const simulatedResponse = {
        transcription: message || 'Hello from frontend',
        response: 'This is a simulated AI response! Your backend is being set up. The connection works, but we need to resolve the Vercel authentication issue.',
        status: 'success',
        timestamp: new Date().toISOString()
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResponse(JSON.stringify(simulatedResponse, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>HR Connect Test</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Test message"
      />
      <button onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test'}
      </button>
      <pre>{response}</pre>
      <p>Backend: {API_BASE_URL}</p>
    </div>
  );
};

export default App;