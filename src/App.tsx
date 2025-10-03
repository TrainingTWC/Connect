import React, { useState } from 'react';

const API_BASE_URL = 'https://hr-sentiment-analyzer-6-hhneayy1f-training-twcs-projects.vercel.app';

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message || 'Hello from frontend'
        }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
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