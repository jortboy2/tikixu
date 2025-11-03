import React, { useState } from "react";
import "./App.css";

function App() {
  // Map visible denominations to product IDs
  const denominationMap = {
    "50k": "1559413",
    "100k": "1559417",
    "200k": "1559583",
    "300k": "7321981",
    "400k": "7322049",
    "500k": "1559587",
    "800k": "9672466",
    "1000k": "1559591",
    "1500k": "24376737",
    "2000k": "1559595",
    "3000k": "2648647",
    "4000k": "24382189",
    "5000k": "1559603",
    "10000k": "7322125",
  };

  const [denomination, setDenomination] = useState("50k");
  const [productId, setProductId] = useState(denominationMap["50k"]);
  // Email and payment method are fixed/hidden in the UI per request
  const email = "vonghung849@gmail.com";
  const paymentMethod = "momo";
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://apitikuxu-1.onrender.com/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await res.json();
      setResult(data);

      if (data?.redirect_url) {
        // sửa ở đây
        setTimeout(() => {
          window.location.assign(data.redirect_url);
        }, 300);
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
            <select
              value={denomination}
              onChange={(e) => {
                setDenomination(e.target.value);
                setProductId(denominationMap[e.target.value]);
              }}
            >
              {Object.keys(denominationMap).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "none" }}>
            Product ID (ẩn)
            <input value={productId} readOnly />
          </label>

          <label style={{ display: "none" }}>
            Payment (ẩn)
            <input value={paymentMethod} readOnly />
          </label>

          <label style={{ display: "none" }}>
            Email (ẩn)
            <input value={email} readOnly />
          </label>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi"}
          </button>

          {result && (
            <pre
              style={{
                textAlign: "left",
                marginTop: 12,
                maxHeight: 240,
                overflow: "auto",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
