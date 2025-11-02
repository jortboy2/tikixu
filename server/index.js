const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = 4000;

// Cho phép frontend gọi API
const allowedOrigins = ["http://localhost:3000", "https://jortboy2.github.io"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// API chính
app.post("/api/order", async (req, res) => {
  try {
    const { product_id } = req.body;
    console.log("👉 Nhận được product_id từ React:", product_id);

    if (!product_id) {
      return res.status(400).json({ error: "Thiếu product_id" });
    }

    const email = "vonghung849@gmail.com";
    const paymentMethod = "momo";

    const url = "https://tiki.vn/api/v2/checkout/virtual";
    const body = {
      product_id: String(product_id),
      qty: 1,
      gift_info: { message: "" },
      payment: { selected_payment_method: paymentMethod, bank_code: "" },
      user_info: { email },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        Origin: "https://tiki.vn",
        Referer: "https://tiki.vn/",
        Cookie:
          "_trackity=d3a4cec7-5106-a335-6d1d-5ec3d6f4d09b; _ga=GA1.1.302977048.1759911662; _gcl_au=1.1.1297413369.1759911667; _tt_enable_cookie=1; _ttp=01K71EHSRQQGBTA9HWMY47V0YR_.tt.1; __iid=749; __iid=749; __R=3; _fbp=fb.1.1759911667869.250256332989881295; _hjSessionUser_522327=eyJpZCI6ImJlNjY0ZTllLTRmZTItNWE2MC1hZWZkLTVkOWUxOTQ2ODA3MSIsImNyZWF0ZWQiOjE3NTk5MTE2NjczMzgsImV4aXN0aW5nIjp0cnVlfQ==; __tb=0; __IP=0; TOKENS={%22access_token%22:%22eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMzY4NTI0OSIsImlhdCI6MTc2MjA4MzA0OCwiZXhwIjoxNzYyMTY5NDQ4LCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjIzNjg1MjQ5IiwiZW1haWwiOiJ2b25naHVuZzg0OUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIyMzY4NTI0OSIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6InNtcyJ9.oNEXB96QrPb30igcMPRoSIUGXNTPK1cs_LGH_xYwwTqfq50ePANxmC_1nJliNQ_MXyKfqcREMGp51mjlydjbXlQIqJqw9MXfigpsrs3MljqgN5bN7YzIkP1Qja6z_ZwmbZCZtz4ADQMofC7Bq2eswe0-2ttL8nghZqk7S315_MREnGzi_SQC2gF3Z8zFmIUOgw3LT9RDowk-Sl0ML9MeIbA90In8oFQreRzcHNAZs5XjM76Wd8epA7-QbxeZBWRSfNpBLb5gSgAvRvYNvvUsFAl6fXGR11TdYfJcpt9r88Lylc_UjHSHABLOpEN-0ayJ__x2kuZE7KoObiKZmcabRO9abzpqM11VSSvtUV5-uBVR9V04UXzxsaPzoK28_5e1zTVMq-R4dsHr50VT4-Ie8JAhlou5DEIMxLGD2WzRG4DF6U5GzxID8Fr7lxO4PWxYsfF7_Zxu255siWGJEJ6d_NLxx_OO1h5GR1vvP_VaMRfrivccpPA7bcYfoXjBIXu9K9zKK7zUdI_OoPP1ikBLUJo6eWrJdHE8NWjcYwFVOOOyTHY7yg0T2RrCPFJSq-FTK4BR5EfJT1IFWR1WwTpQlwTnMJOS6ek-bYvgr4097sH947xs8XxKH0NSBf0RaYrVn3Zqgsl3o0NwYGjx_L802hYf-SeAIku7J2MuuHR1mp0%22%2C%22refresh_token%22:%22TKIA15N9A75EcLgk2r8XdxGqE1tm_c3hk4V2UNibqtVCV5AJxNvfFdG4JYnn6Qppo6cnI1EoeQ4xOO284LAJ%22%2C%22token_type%22:%22bearer%22%2C%22expires_in%22:86400%2C%22expires_at%22:1762169448875%2C%22customer_id%22:23685249}; TIKI_ACCESS_TOKEN=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMzY4NTI0OSIsImlhdCI6MTc2MjA4MzA0OCwiZXhwIjoxNzYyMTY5NDQ4LCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjIzNjg1MjQ5IiwiZW1haWwiOiJ2b25naHVuZzg0OUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIyMzY4NTI0OSIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6InNtcyJ9.oNEXB96QrPb30igcMPRoSIUGXNTPK1cs_LGH_xYwwTqfq50ePANxmC_1nJliNQ_MXyKfqcREMGp51mjlydjbXlQIqJqw9MXfigpsrs3MljqgN5bN7YzIkP1Qja6z_ZwmbZCZtz4ADQMofC7Bq2eswe0-2ttL8nghZqk7S315_MREnGzi_SQC2gF3Z8zFmIUOgw3LT9RDowk-Sl0ML9MeIbA90In8oFQreRzcHNAZs5XjM76Wd8epA7-QbxeZBWRSfNpBLb5gSgAvRvYNvvUsFAl6fXGR11TdYfJcpt9r88Lylc_UjHSHABLOpEN-0ayJ__x2kuZE7KoObiKZmcabRO9abzpqM11VSSvtUV5-uBVR9V04UXzxsaPzoK28_5e1zTVMq-R4dsHr50VT4-Ie8JAhlou5DEIMxLGD2WzRG4DF6U5GzxID8Fr7lxO4PWxYsfF7_Zxu255siWGJEJ6d_NLxx_OO1h5GR1vvP_VaMRfrivccpPA7bcYfoXjBIXu9K9zKK7zUdI_OoPP1ikBLUJo6eWrJdHE8NWjcYwFVOOOyTHY7yg0T2RrCPFJSq-FTK4BR5EfJT1IFWR1WwTpQlwTnMJOS6ek-bYvgr4097sH947xs8XxKH0NSBf0RaYrVn3Zqgsl3o0NwYGjx_L802hYf-SeAIku7J2MuuHR1mp0; TIKI_USER=8vWqeSMWQmdjqqJ7RaBugh%2BxHvtbIl1uuqZ9X9jnlTby34fHzw1GhYu5L9Efhpo%2FAWAk7Cgy9bT%2B; bnpl_whitelist_info={%22content%22:%22Mua%20tr%C6%B0%E1%BB%9Bc%20tr%E1%BA%A3%20sau%22%2C%22is_enabled%22:true%2C%22icon%22:%22https://salt.tikicdn.com/ts/tmp/95/15/2d/4b3d64b220f55f42885c86ac439d6d62.png%22%2C%22deep_link%22:%22https://tiki.vn/mua-truoc-tra-sau/dang-ky?src=account_page%22}; __RC=59; TKSESSID=4f70df14e05e8d74b20723f7c51cd5e1; delivery_zone=Vk4wMzkwMDYwMDE=; _tuid=23685249; tiki_client_id=302977048.1759911662; cto_bundle=RJTNKV9XQnYzWGRNcXo0OFRGSUEzMVozNCUyRldUOFRjbUp3RDIlMkJXNE9SdHQ1d054NlpsVlg0MGdDR2Y3VkxYTWVMR05JbWhZcmN1dnpkSTB6RDdqaFkycWZZJTJGMEpJV01KakNtd3AlMkZUWTM1cmZNeklYTkp2WnpCZ2JVV3B6V254RWtlN3FHZDdWb1J6eVFkJTJGRkZMYnREeHdYRHVxcUJRSmpCSDh2YUdUUCUyQkhJNyUyQnRsQXJRWjBNQ2QlMkJvbU4lMkJKYXI0b0tBRTZyJTJCY3pQckljMCUyRnBESDIzRThER3k4QSUzRCUzRA; __su=0; __su=0; _hjSession_522327=eyJpZCI6IjI4Mjc1MDQ0LTYwYzAtNDQyNy04NjUxLTFjNDRkMjE1MzRlYyIsImMiOjE3NjIwOTc1NDE1MTcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; ttcsid=1762097541627::Z_vp_Y_Jnq1-1xb1HMwe.16.1762097549163.0; ttcsid_D031T03C77UFNM54TPR0=1762097541627::qmNNtYC-dNvmt-ryJuDC.16.1762097549163.0; __uif=__uid%3A5393765522603524981%7C__ui%3A-1%7C__create%3A1759376553; _ga_S9GLR1RQFJ=GS2.1.s1762095180$o16$g1$t1762098699$j59$l0$h0; amp_99d374=o93rFZCfdtcWPel3WC6pPw.MjM2ODUyNDk=..1j92j5538.1j92k8oeh.fc.mf.15r",
        "x-access-token":
          "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMzY4NTI0OSIsImlhdCI6MTc2MjA4MzA0OCwiZXhwIjoxNzYyMTY5NDQ4LCJpc3MiOiJodHRwczovL3Rpa2kudm4iLCJjdXN0b21lcl9pZCI6IjIzNjg1MjQ5IiwiZW1haWwiOiJ2b25naHVuZzg0OUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJ0aWtpLXNzbyIsIm5hbWUiOiIyMzY4NTI0OSIsInNjb3BlIjoic3NvIiwiZ3JhbnRfdHlwZSI6InNtcyJ9.oNEXB96QrPb30igcMPRoSIUGXNTPK1cs_LGH_xYwwTqfq50ePANxmC_1nJliNQ_MXyKfqcREMGp51mjlydjbXlQIqJqw9MXfigpsrs3MljqgN5bN7YzIkP1Qja6z_ZwmbZCZtz4ADQMofC7Bq2eswe0-2ttL8nghZqk7S315_MREnGzi_SQC2gF3Z8zFmIUOgw3LT9RDowk-Sl0ML9MeIbA90In8oFQreRzcHNAZs5XjM76Wd8epA7-QbxeZBWRSfNpBLb5gSgAvRvYNvvUsFAl6fXGR11TdYfJcpt9r88Lylc_UjHSHABLOpEN-0ayJ__x2kuZE7KoObiKZmcabRO9abzpqM11VSSvtUV5-uBVR9V04UXzxsaPzoK28_5e1zTVMq-R4dsHr50VT4-Ie8JAhlou5DEIMxLGD2WzRG4DF6U5GzxID8Fr7lxO4PWxYsfF7_Zxu255siWGJEJ6d_NLxx_OO1h5GR1vvP_VaMRfrivccpPA7bcYfoXjBIXu9K9zKK7zUdI_OoPP1ikBLUJo6eWrJdHE8NWjcYwFVOOOyTHY7yg0T2RrCPFJSq-FTK4BR5EfJT1IFWR1WwTpQlwTnMJOS6ek-bYvgr4097sH947xs8XxKH0NSBf0RaYrVn3Zqgsl3o0NwYGjx_L802hYf-SeAIku7J2MuuHR1mp0",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("✅ Kết quả từ Tiki API:", data);
    // Nếu có redirect_url => trả riêng cho React
    if (data?.redirect_url) {
      console.log("✅ redirect_url:", data.redirect_url);
      return res.json({ redirect_url: data.redirect_url });
    }

    // Nếu không có redirect_url, trả nguyên kết quả
    res.status(response.status).json({
      ok: response.ok,
      status: response.status,
      data,
    });
  } catch (err) {
    console.error("❌ Lỗi gọi Tiki API:", err);
    res.status(500).json({ error: err.message });
  }
});

// Kiểm tra server
app.get("/", (req, res) => {
  res.send("Proxy server is running with token + cookie headers ✅");
});

app.listen(PORT, () => console.log(`🚀 Proxy listening on port ${PORT}`));
