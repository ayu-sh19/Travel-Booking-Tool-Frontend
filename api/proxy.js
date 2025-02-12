// api/proxy.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set the CORS headers to allow your Vercel domain
  res.setHeader('Access-Control-Allow-Origin', 'https://your-app.vercel.app'); // Or use '*' for all origins (not recommended for production)
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Define your Appwrite API endpoint (adjust as needed)
  const appwriteUrl = 'https://cloud.appwrite.io/v1';

  try {
    // Forward the request to Appwrite
    const response = await fetch(appwriteUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Include any additional headers as required
      },
      // Only include a body for non-GET requests
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching from Appwrite:', error);
    res.status(500).json({ error: 'Error fetching from Appwrite API' });
  }
};
