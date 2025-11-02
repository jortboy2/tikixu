import React, { useState } from 'react';
import './App.css';

function App() {
  // Map visible denominations to product IDs
  const denominationMap = {
    '50k': '1559413',
    '100k': '1559417',
    '200k': '1559583'
  };

  const [denomination, setDenomination] = useState('50k');
  const [productId, setProductId] = useState(denominationMap['50k']);
  // Email and payment method are fixed/hidden in the UI per request
  const email = 'vonghung849@gmail.com';
  const paymentMethod = 'momo';
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    const url = 'https://tiki.vn/api/v2/checkout/virtual';
    const body = {
      product_id: String(productId),
  qty: 1,
      gift_info: { message: '' },
      payment: { selected_payment_method: paymentMethod, bank_code: '' },
      user_info: { email }
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMzY4NTI0OSIsImlhdCI6MTc2MjA4MzA0OCwiZXhwIjoxNzYyMTY5NDQ4LCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjIzNjg1MjQ5IiwiZW1haWwiOiJ2b25naHVuZzg0OUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIyMzY4NTI0OSIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6InNtcyJ9.oNEXB96QrPb30igcMPRoSIUGXNTPK1cs_LGH_xYwwTqfq50ePANxmC_1nJliNQ_MXyKfqcREMGp51mjlydjbXlQIqJqw9MXfigpsrs3MljqgN5bN7YzIkP1Qja6z_ZwmbZCZtz4ADQMofC7Bq2eswe0-2ttL8nghZqk7S315_MREnGzi_SQC2gF3Z8zFmIUOgw3LT9RDowk-Sl0ML9MeIbA90In8oFQreRzcHNAZs5XjM76Wd8epA7-QbxeZBWRSfNpBLb5gSgAvRvYNvvUsFAl6fXGR11TdYfJcpt9r88Lylc_UjHSHABLOpEN-0ayJ__x2kuZE7KoObiKZmcabRO9abzpqM11VSSvtUV5-uBVR9V04UXzxsaPzoK28_5e1zTVMq-R4dsHr50VT4-Ie8JAhlou5DEIMxLGD2WzRG4DF6U5GzxID8Fr7lxO4PWxYsfF7_Zxu255siWGJEJ6d_NLxx_OO1h5GR1vvP_VaMRfrivccpPA7bcYfoXjBIXu9K9zKK7zUdI_OoPP1ikBLUJo6eWrJdHE8NWjcYwFVOOOyTHY7yg0T2RrCPFJSq-FTK4BR5EfJT1IFWR1WwTpQlwTnMJOS6ek-bYvgr4097sH947xs8XxKH0NSBf0RaYrVn3Zqgsl3o0NwYGjx_L802hYf-SeAIku7J2MuuHR1mp0',
          'Cookie': '_trackity=d3a4cec7-5106-a335-6d1d-5ec3d6f4d09b; _ga=GA1.1.302977048.1759911662; _gcl_au=1.1.1297413369.1759911667; _tt_enable_cookie=1; _ttp=01K71EHSRQQGBTA9HWMY47V0YR_.tt.1; __iid=749; __iid=749; __R=3; _fbp=fb.1.1759911667869.250256332989881295; _hjSessionUser_522327=eyJpZCI6ImJlNjY0ZTllLTRmZTItNWE2MC1hZWZkLTVkOWUxOTQ2ODA3MSIsImNyZWF0ZWQiOjE3NTk5MTE2NjczMzgsImV4aXN0aW5nIjp0cnVlfQ==; __tb=0; __IP=0; TOKENS={%22access_token%22:%22eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMzY4NTI0OSIsImlhdCI6MTc2MjA4MzA0OCwiZXhwIjoxNzYyMTY5NDQ4LCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjIzNjg1MjQ5IiwiZW1haWwiOiJ2b25naHVuZzg0OUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIyMzY4NTI0OSIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6InNtcyJ9.oNEXB96QrPb30igcMPRoSIUGXNTPK1cs_LGH_xYwwTqfq50ePANxmC_1nJliNQ_MXyKfqcREMGp51mjlydjbXlQIqJqw9MXfigpsrs3MljqgN5bN7YzIkP1Qja6z_ZwmbZCZtz4ADQMofC7Bq2eswe0-2ttL8nghZqk7S315_MREnGzi_SQC2gF3Z8zFmIUOgw3LT9RDowk-Sl0ML9MeIbA90In8oFQreRzcHNAZs5XjM76Wd8epA7-QbxeZBWRSfNpBLb5gSgAvRvYNvvUsFAl6fXGR11TdYfJcpt9r88Lylc_UjHSHABLOpEN-0ayJ__x2kuZE7KoObiKZmcabRO9abzpqM11VSSvtUV5-uBVR9V04UXzxsaPzoK28_5e1zTVMq-R4dsHr50VT4-Ie8JAhlou5DEIMxLGD2WzRG4DF6U5GzxID8Fr7lxO4PWxYsfF7_Zxu255siWGJEJ6d_NLxx_OO1h5GR1vvP_VaMRfrivccpPA7bcYfoXjBIXu9K9zKK7zUdI_OoPP1ikBLUJo6eWrJdHE8NWjcYwFVOOOyTHY7yg0T2RrCPFJSq-FTK4BR5EfJT1IFWR1WwTpQlwTnMJOS6ek-bYvgr4097sH947xs8XxKH0NSBf0RaYrVn3Zqgsl3o0NwYGjx_L802hYf-SeAIku7J2MuuHR1mp0%22%2C%22refresh_token%22:%22TKIA15N9A75EcLgk2r8XdxGqE1tm_c3hk4V2UNibqtVCV5AJxNvfFdG4JYnn6Qppo6cnI1EoeQ4xOO284LAJ%22%2C%22token_type%22:%22bearer%22%2C%22expires_in%22:86400%2C%22expires_at%22:1762169448875%2C%22customer_id%22:23685249}; TIKI_ACCESS_TOKEN=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMzY4NTI0OSIsImlhdCI6MTc2MjA4MzA0OCwiZXhwIjoxNzYyMTY5NDQ4LCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjIzNjg1MjQ5IiwiZW1haWwiOiJ2b25naHVuZzg0OUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIyMzY4NTI0OSIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6InNtcyJ9.oNEXB96QrPb30igcMPRoSIUGXNTPK1cs_LGH_xYwwTqfq50ePANxmC_1nJliNQ_MXyKfqcREMGp51mjlydjbXlQIqJqw9MXfigpsrs3MljqgN5bN7YzIkP1Qja6z_ZwmbZCZtz4ADQMofC7Bq2eswe0-2ttL8nghZqk7S315_MREnGzi_SQC2gF3Z8zFmIUOgw3LT9RDowk-Sl0ML9MeIbA90In8oFQreRzcHNAZs5XjM76Wd8epA7-QbxeZBWRSfNpBLb5gSgAvRvYNvvUsFAl6fXGR11TdYfJcpt9r88Lylc_UjHSHABLOpEN-0ayJ__x2kuZE7KoObiKZmcabRO9abzpqM11VSSvtUV5-uBVR9V04UXzxsaPzoK28_5e1zTVMq-R4dsHr50VT4-Ie8JAhlou5DEIMxLGD2WzRG4DF6U5GzxID8Fr7lxO4PWxYsfF7_Zxu255siWGJEJ6d_NLxx_OO1h5GR1vvP_VaMRfrivccpPA7bcYfoXjBIXu9K9zKK7zUdI_OoPP1ikBLUJo6eWrJdHE8NWjcYwFVOOOyTHY7yg0T2RrCPFJSq-FTK4BR5EfJT1IFWR1WwTpQlwTnMJOS6ek-bYvgr4097sH947xs8XxKH0NSBf0RaYrVn3Zqgsl3o0NwYGjx_L802hYf-SeAIku7J2MuuHR1mp0; TIKI_USER=8vWqeSMWQmdjqqJ7RaBugh%2BxHvtbIl1uuqZ9X9jnlTby34fHzw1GhYu5L9Efhpo%2FAWAk7Cgy9bT%2B; bnpl_whitelist_info={%22content%22:%22Mua%20tr%C6%B0%E1%BB%9Bc%20tr%E1%BA%A3%20sau%22%2C%22is_enabled%22:true%2C%22icon%22:%22https://salt.tikicdn.com/ts/tmp/95/15/2d/4b3d64b220f55f42885c86ac439d6d62.png%22%2C%22deep_link%22:%22https://tiki.vn/mua-truoc-tra-sau/dang-ky?src=account_page%22}; __RC=59; TKSESSID=4f70df14e05e8d74b20723f7c51cd5e1; delivery_zone=Vk4wMzkwMDYwMDE=; _tuid=23685249; tiki_client_id=302977048.1759911662; _hjSession_522327=eyJpZCI6ImYwNWViNjkyLTM2YWQtNGJjNi05ZGZhLWEzYmYzMzRiZjlmNSIsImMiOjE3NjIwOTI0MDQ0MzYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; __uif=__uid%3A5393765522603524981%7C__ui%3A-1%7C__create%3A1759376553; cto_bundle=RJTNKV9XQnYzWGRNcXo0OFRGSUEzMVozNCUyRldUOFRjbUp3RDIlMkJXNE9SdHQ1d054NlpsVlg0MGdDR2Y3VkxYTWVMR05JbWhZcmN1dnpkSTB6RDdqaFkycWZZJTJGMEpJV01KakNtd3AlMkZUWTM1cmZNeklYTkp2WnpCZ2JVV3B6V254RWtlN3FHZDdWb1J6eVFkJTJGRkZMYnREeHdYRHVxcUJRSmpCSDh2YUdUUCUyQkhJNyUyQnRsQXJRWjBNQ2QlMkJvbU4lMkJKYXI0b0tBRTZyJTJCY3pQckljMCUyRnBESDIzRThER3k4QSUzRCUzRA; ttcsid=1762095180865::9XHTve4DmT8PjVTjjK-C.15.1762095446611.0; ttcsid_D031T03C77UFNM54TPR0=1762095180864::ZflDC5lB5RH2QainT8A2.15.1762095446611.0; _ga_S9GLR1RQFJ=GS2.1.s1762095180$o16$g1$t1762095448$j51$l0$h0; amp_99d374=o93rFZCfdtcWPel3WC6pPw.MjM2ODUyNDk=..1j92e8dg9.1j92h5hm8.eu.lg.14e'
          // Note: browsers do NOT allow setting the `Cookie` request header manually.
        },
        body: JSON.stringify(body),
        // include credentials so the browser will send cookies for the target origin if allowed
        credentials: 'include'
      });

      const data = await res.json().catch(() => null);
      setResult({ ok: res.ok, status: res.status, data });

      // If the API returns a redirect_url, navigate there automatically
      if (data && data.redirect_url) {
        // small timeout to allow UI update before redirecting
        setTimeout(() => {
          window.location.assign(data.redirect_url);
        }, 250);
      }
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <div className="qr-card">

          <label>
            Chọn mệnh giá
            <select value={denomination} onChange={e => { setDenomination(e.target.value); setProductId(denominationMap[e.target.value]); }}>
              {Object.keys(denominationMap).map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </label>

          <label style={{ display: 'none' }}>
            Product ID (ẩn)
            <input value={productId} readOnly />
          </label>

          <label style={{ display: 'none' }}>
            Payment (ẩn)
            <input value={paymentMethod} readOnly />
          </label>

          <label style={{ display: 'none' }}>
            Email (ẩn)
            <input value={email} readOnly />
          </label>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi'}
          </button>

          {result && (
            <pre style={{ textAlign: 'left', marginTop: 12, maxHeight: 240, overflow: 'auto' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
