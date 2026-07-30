import stampImg from '../assets/stamp.png';

/**
 * Generates and downloads a PDF receipt for a completed order
 * using a print-friendly HTML window (no external dependencies).
 * @param {Object} order - The order data from the server response.
 */
const generateReceipt = async (order) => {
  // Resolve absolute URL for the image so it works in the about:blank window
  const stampAbsoluteUrl = new URL(stampImg, window.location.origin).href;

  const items = order.items || [];
  let subtotal = 0;
  items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  const shipping = subtotal >= 2000 ? 0 : 199;

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString('en-IN', {
        dateStyle: 'long',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' });

  const addr = order.shippingAddress || {};

  const itemRows = items
    .map(
      (item, i) => `
      <tr style="background: ${i % 2 === 0 ? '#fafafa' : '#fff'};">
        <td style="padding: 10px 12px; font-weight: 600; border-bottom: 1px solid #e5e5e5;">
          ${item.name}${item.size ? ` <span style="color:#888;font-size:11px;">(${item.size})</span>` : ''}
        </td>
        <td style="padding: 10px 12px; text-align:center; border-bottom: 1px solid #e5e5e5;">${item.quantity}</td>
        <td style="padding: 10px 12px; text-align:right; border-bottom: 1px solid #e5e5e5;">Rs. ${item.price.toLocaleString('en-IN')}</td>
        <td style="padding: 10px 12px; text-align:right; font-weight:700; border-bottom: 1px solid #e5e5e5;">Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PANEL - Receipt #${order._id.slice(-8).toUpperCase()}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      color: #111;
      background: #f5f5f5;
      padding: 0;
    }

    .page {
      max-width: 680px;
      margin: 0 auto;
      padding: 40px 36px;
      background: #fff;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    /* ─── Manga dots background ─── */
    .page::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
      background-size: 16px 16px;
      opacity: 0.4;
      pointer-events: none;
      z-index: 0;
    }
    .page > * { position: relative; z-index: 1; }

    /* ─── Header Banner ─── */
    .header {
      background: #fde047;
      border: 3px solid #000;
      padding: 24px 28px;
      margin-bottom: 28px;
      box-shadow: 6px 6px 0 #000;
      position: relative;
      overflow: hidden;
    }
    .header-content {
      position: relative;
      z-index: 2;
    }
    .header h1 {
      font-family: 'Bangers', cursive;
      font-size: 48px;
      letter-spacing: 6px;
      text-transform: uppercase;
      margin: 0;
      text-shadow: 3px 3px 0 rgba(0,0,0,0.1);
    }
    .header .tagline {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 3px;
      color: #333;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .header .slogan {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #555;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .goku-header {
      position: absolute;
      right: -10px;
      bottom: -8px;
      height: 140px;
      z-index: 1;
      filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.15));
    }

    /* ─── Receipt Title ─── */
    .receipt-title {
      text-align: center;
      font-family: 'Bangers', cursive;
      font-size: 22px;
      letter-spacing: 6px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .title-line {
      width: 80px;
      height: 3px;
      background: #000;
      margin: 0 auto 24px;
    }

    /* ─── Info Box ─── */
    .info-box {
      border: 2.5px solid #000;
      background: #fafafa;
      margin-bottom: 24px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      font-size: 13px;
      border-bottom: 1px dashed #ccc;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #555;
      font-size: 11px;
    }
    .info-value {
      font-weight: 700;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }

    /* ─── Status Badge ─── */
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border: 2px solid #000;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .badge-paid { background: #4ade80; }
    .badge-pending { background: #fde047; }

    /* ─── Items Table ─── */
    .items-table {
      width: 100%;
      border-collapse: collapse;
      border: 2.5px solid #000;
      margin-bottom: 20px;
    }
    .items-table thead {
      background: #000;
      color: #fff;
    }
    .items-table th {
      padding: 10px 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      text-align: left;
    }
    .items-table th:nth-child(2) { text-align: center; }
    .items-table th:nth-child(3),
    .items-table th:nth-child(4) { text-align: right; }
    .items-table td { font-size: 13px; }

    /* ─── Totals ─── */
    .totals {
      margin-bottom: 24px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
      color: #555;
    }
    .total-final {
      background: #fde047;
      border: 3px solid #000;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      box-shadow: 4px 4px 0 #000;
    }
    .total-final span:first-child {
      font-family: 'Bangers', cursive;
      font-size: 20px;
      letter-spacing: 4px;
      text-transform: uppercase;
    }
    .total-final span:last-child {
      font-family: 'Bangers', cursive;
      font-size: 26px;
    }

    /* ─── Address Section ─── */
    .address-section {
      display: flex;
      gap: 20px;
      align-items: flex-start;
      margin-bottom: 28px;
    }
    .address-box {
      border: 2.5px solid #000;
      flex: 1;
    }
    .address-header {
      background: #f0f0f0;
      padding: 8px 16px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      border-bottom: 2px solid #000;
    }
    .address-body {
      padding: 12px 16px;
      font-size: 13px;
      color: #444;
      line-height: 1.8;
    }

    /* ─── Goku Stamp ─── */
    .goku-stamp {
      flex-shrink: 0;
      width: 140px;
      height: 140px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .goku-stamp img {
      width: 130px;
      height: 130px;
      object-fit: contain;
      filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.1));
    }
    .stamp-ring {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border: 4px solid rgba(234, 88, 12, 0.25);
      border-radius: 50%;
      animation: stamp-pulse 2s ease-in-out infinite;
    }
    @keyframes stamp-pulse {
      0%, 100% { transform: scale(1); opacity: 0.4; }
      50% { transform: scale(1.05); opacity: 0.7; }
    }
    .stamp-text {
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      background: #000;
      color: #fde047;
      font-size: 7px;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 2px 8px;
      white-space: nowrap;
    }

    /* ─── Footer ─── */
    .footer {
      text-align: center;
      border-top: 2px dashed #ccc;
      padding-top: 20px;
    }
    .footer-brand {
      display: inline-block;
      background: #000;
      color: #fff;
      font-family: 'Bangers', cursive;
      font-size: 16px;
      letter-spacing: 4px;
      padding: 4px 12px;
      margin-bottom: 8px;
    }
    .footer p {
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .footer .sub {
      font-size: 10px;
      color: #888;
      font-weight: 400;
    }
    .footer .disclaimer {
      font-size: 9px;
      color: #aaa;
      font-style: italic;
      margin-top: 10px;
    }
    .footer .receipt-id {
      font-size: 9px;
      color: #bbb;
      font-family: 'Courier New', monospace;
      margin-top: 6px;
    }

    /* ─── Print Styles ─── */
    @media print {
      body { padding: 0; background: #fff; }
      .page { padding: 20px; box-shadow: none; }
      .no-print { display: none !important; }
      .stamp-ring { animation: none; }
    }
  </style>
</head>
<body>
  <div class="page">

    <!-- Download / Print Buttons -->
    <div class="no-print" style="text-align: center; margin-bottom: 20px;">
      <button onclick="window.print()" style="
        background: #000; color: #fff; border: 3px solid #000;
        padding: 12px 32px; font-size: 13px; font-weight: 700;
        letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
        box-shadow: 4px 4px 0 #fde047; margin-right: 12px;
      ">PRINT / SAVE AS PDF</button>
      <button onclick="window.close()" style="
        background: #fff; color: #000; border: 3px solid #000;
        padding: 12px 32px; font-size: 13px; font-weight: 700;
        letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
        box-shadow: 4px 4px 0 #000;
      ">CLOSE</button>
    </div>

    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <h1>PANEL</h1>
        <div class="tagline">Comic &amp; Anime Store</div>
        <div class="slogan">Live beyond the panels.</div>
      </div>
    </div>

    <!-- Receipt Title -->
    <div class="receipt-title">★ Payment Receipt ★</div>
    <div class="title-line"></div>

    <!-- Order Info -->
    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Order ID</span>
        <span class="info-value">${order._id}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Date</span>
        <span class="info-value">${orderDate}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Payment Method</span>
        <span class="info-value">${order.paymentMethod}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Payment Status</span>
        <span class="badge ${order.paymentStatus === 'Paid' ? 'badge-paid' : 'badge-pending'}">${order.paymentStatus || 'Pending'}</span>
      </div>
      ${order.paymentId ? `
      <div class="info-row">
        <span class="info-label">Reference ID</span>
        <span class="info-value">${order.paymentId}</span>
      </div>` : ''}
    </div>

    <!-- Items Table -->
    <table class="items-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals">
      <div class="total-row">
        <span>Subtotal</span>
        <span>Rs. ${subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div class="total-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span>
      </div>
      <div class="total-final">
        <span>Total</span>
        <span>Rs. ${order.totalPrice.toLocaleString('en-IN')}</span>
      </div>
    </div>

    <!-- Shipping Address + Stamp -->
    <div class="address-section">
      ${order.shippingAddress ? `
      <div class="address-box">
        <div class="address-header">Shipping Address</div>
        <div class="address-body">
          <strong>${addr.fullName || ''}</strong><br>
          ${addr.street || ''}<br>
          ${addr.city || ''}, ${addr.state || ''} - ${addr.zipCode || ''}<br>
          ${addr.country || ''}
          ${addr.phone ? `<br>Phone: ${addr.phone}` : ''}
          ${addr.email ? `<br>Email: ${addr.email}` : ''}
        </div>
      </div>` : ''}

      ${stampAbsoluteUrl ? `
      <div class="goku-stamp">
        <div class="stamp-ring"></div>
        <img src="${stampAbsoluteUrl}" alt="Stamp" />
        <div class="stamp-text">Verified ✓</div>
      </div>` : ''}
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">PANEL</div>
      <p>Thank you for shopping at PANEL!</p>
      <p class="sub">Your go-to destination for comics, anime &amp; collectibles.</p>
      <p class="disclaimer">This is a computer-generated receipt and does not require a signature.</p>
      <p class="receipt-id">PNL-RECEIPT-${new Date().getFullYear()}</p>
    </div>

  </div>
</body>
</html>`;

  // Open in a new window for print/save
  const printWindow = window.open('', '_blank', 'width=760,height=900');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
  }
};

export default generateReceipt;
