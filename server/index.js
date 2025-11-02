const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Allow requests from localhost:3000 (React dev server) and GitHub Pages domain if needed
const allowedOrigins = [ 'http://localhost:3000', 'https://jortboy2.github.io' ];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.post('/proxy/checkout', async (req, res) => {
  try {
    const tikiUrl = 'https://tiki.vn/api/v2/checkout/virtual';
    const body = req.body;

    const headers = {
      'Content-Type': 'application/json'
    };

    // Allow client to pass a Cookie header (for testing) by sending `x-forward-cookie` header.
    // Browsers cannot set `Cookie` header, so client can call this proxy and include cookie
    // value in `x-forward-cookie`, or you can set PROXY_COOKIE env var on server.
    const forwardedCookie = req.get('x-forward-cookie') || process.env.PROXY_COOKIE;
    if (forwardedCookie) {
      headers['Cookie'] = forwardedCookie;
    }

    const fetchRes = await fetch(tikiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const text = await fetchRes.text();
    // Try to parse JSON, else return as text
    try {
      const json = JSON.parse(text);
      return res.status(fetchRes.status).json(json);
    } catch (e) {
      return res.status(fetchRes.status).send(text);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log('Proxy listening on', PORT));
