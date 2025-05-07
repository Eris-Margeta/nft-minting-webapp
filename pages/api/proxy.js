import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: response.statusText });
    }

    const contentType = response.headers.get('Content-Type');
    const buffer = await response.buffer();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(buffer);
  } catch (error) {
    console.error('Error fetching the URL:', error);
    res.status(500).json({ error: 'Failed to fetch the data' });
  }
}
