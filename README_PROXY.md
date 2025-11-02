Proxy server for bypassing CORS when calling tiki.vn checkout API

Setup
1. In project root, install server deps:
   cd server
   npm install

2. Start the proxy:
   npm start

By default the proxy listens on port 4000 and exposes POST /proxy/checkout

How to call from client (example using fetch)

fetch('http://localhost:4000/proxy/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // If you need to forward a Cookie value to tiki, set it in x-forward-cookie
    // e.g. 'x-forward-cookie': 'session=abcd; other=..'
  },
  body: JSON.stringify({
    product_id: '1559413',
    qty: 1,
    gift_info: { message: '' },
    payment: { selected_payment_method: 'momo', bank_code: '' },
    user_info: { email: 'you@example.com' }
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)

Notes
- Browsers cannot set the `Cookie` request header directly. This proxy accepts an `x-forward-cookie` header and will set the actual `Cookie` header when forwarding to tiki.
- Alternatively set PROXY_COOKIE environment variable before starting the proxy to always send the same cookie.
- Update `server/index.js` allowedOrigins if you need to permit other origins.
