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

  // receipt upload (local only) so user can "chụp bill" and preview before sending to Nghị
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setReceiptFile(f);
    setReceiptPreview(URL.createObjectURL(f));
  };

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
        setTimeout(() => window.location.assign(data.redirect_url), 300);
      }
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSendReceipt = () => {
    // For now we just show the selected file info in the UI. In a real app you'd POST it to your server.
    if (!receiptFile) {
      setResult({ error: "Vui lòng chọn ảnh bill trước khi gửi." });
      return;
    }
    setResult({ receipt: { name: receiptFile.name, size: receiptFile.size } });
  };

  return (
    <div className="App">
      <main className="App-main">
        <div className="qr-card nice-card">
          <header className="card-header">
            <h1>Thanh toán nạp tiền</h1>
            <p className="subtitle">Chọn mệnh giá, bấm Thanh toán. Khi thanh toán xong, chụp bill lại cho Nghị.</p>
          </header>
          
          <div className="card-body">
            <div className="left">
              <label className="field">
                <div className="field-label">Chọn mệnh giá</div>
                <select
                  value={denomination}
                  onChange={(e) => {
                    setDenomination(e.target.value);
                    setProductId(denominationMap[e.target.value]);
                  }}
                >
                  {Object.keys(denominationMap).map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </label>

              <div style={{ display: 'none' }}>
                <input value={productId} readOnly />
                <input value={paymentMethod} readOnly />
                <input value={email} readOnly />
              </div>

              <button className="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Đang gửi..." : "Thanh toán"}
              </button>
            </div>

    
        
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
