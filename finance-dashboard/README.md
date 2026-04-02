# 💰 FinBoard Pro — Finance Dashboard UI

> A clean, interactive, and responsive finance dashboard built with **React** and **Tailwind CSS**. Track financial activity, view transaction history, and monitor market trends in real-time.

---

## 🚀 Live Features

### 1. Dashboard Overview
- **Summary Cards** — Displays Total Balance, Total Income, and Total Expenses with trend indicators.
- **Visualizations:**
  - 📈 **Balance Trend** — Line chart showing income vs. expense trends over time.
  - 🥧 **Spending Breakdown** — Pie chart categorizing expenses by type.
- **Automated Insights** — Smart cards showing highest spending categories and average transaction sizes.

### 2. Transaction Management
- **Interactive Table** — View all transactions with Date, Description, Category, and Amount.
- **Search & Filter** — Real-time search bar and dropdown filters for transaction types.
- **Sorting** — Clickable headers to sort by Date, Category, or Amount.

### 3. Role-Based Access Control (RBAC)
The application simulates two user roles:

| Role | Permissions |
|------|-------------|
| **Viewer** | View dashboard, charts, and tables. Cannot add, edit, or delete. |
| **Admin** | Full access — add, edit, and delete transactions after login. |

**Login Credentials:**
```
User ID  : admin
Password : admin123
```

### 4. Real-Time Market Footer
- **Market Status** — Auto-calculates IST to display if the market is `Open`, `Closed`, or `Pre-Market`.
- **Live Ticker** — Simulates live stock price updates for NIFTY 50, SENSEX, Reliance, TCS, and more.
- **Commodities** — Displays Gold, Silver, and USD/INR rates.
- **Regulatory Links** — Quick links to SEBI, NSE, and BSE.

### 5. User Experience
- 🌙 **Dark Mode** — Full light/dark theme support, persisted in local storage.
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop.
- 💾 **Data Persistence** — Transactions saved in browser's Local Storage.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** (Vite) | Frontend Framework |
| **Tailwind CSS** | Styling |
| **Recharts** | Charts & Visualizations |
| **Lucide React** | Icons |
| **React Context API** | State Management |
| **UUID** | Unique ID Generation |

---

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Dashboard/      # Cards, Charts, Insights
│   ├── Layout/         # Header, Footer, LoginModal
│   └── Transactions/   # Table, Forms
├── context/            # AppContext for Global State (Auth, Theme, Data)
├── data/               # Mock data generators
├── utils/              # Helper functions (formatCurrency, formatDate)
├── App.jsx             # Main Application Component
├── main.jsx            # Entry Point
└── index.css           # Tailwind CSS directives
```

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn** package manager

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in Browser**

Navigate to `http://localhost:5173` (or the URL shown in your terminal).

---

## 🔧 Usage Guide

### Switching Themes
Click the **Sun/Moon icon** in the top-right header to toggle between Light and Dark modes.

### Logging in as Admin
1. Click the **Login** button in the header.
2. Enter the credentials:
   - **User:** `admin`
   - **Pass:** `admin123`
3. Once logged in, the **Add Transaction** button appears and Action columns (Edit/Delete) become visible.

### Adding a Transaction
1. Click **Add Transaction**.
2. Fill in the details (Type, Date, Amount, Category, Description).
3. Click **Submit** — the table updates instantly.

---

## 📝 Assumptions & Design Decisions

1. **Simulated Market Data** — Free stock market APIs often have CORS restrictions, so market footer data is simulated to create realistic "ticking" behavior. It accurately reflects Indian Market hours (IST).
2. **Local Storage** — All transaction data is stored in the browser's Local Storage to avoid the need for a backend database.
3. **Frontend RBAC** — Role-Based Access Control is handled entirely on the frontend for demonstration purposes.

---

## 📜 License

This project is created for **educational and evaluation purposes as part of a frontend development assignment**.
---

> Built with ❤️ using React + Tailwind CSS