# Amazon Helper

An AI-powered Chrome extension that analyzes Amazon products and customer reviews to help users make better buying decisions.

## Features

- Detects Amazon product pages
- Gets product information from the page
- Collects customer reviews
- Uses Google Gemini to analyze the product and reviews
- Shows AI-generated pros, cons, review sentiment, and buying recommendations

## Tech Stack

**Frontend**

- React
- TypeScript/JavaScript
- Vite
- Tailwind CSS
- Chrome Extension Manifest V3
- Claude — used to help build the frontend UI

**Backend**

- Python
- FastAPI
- Google Gemini API

## How It Works

```text
Amazon Product Page
        ↓
    content.js
        ↓
Product Info + Reviews
        ↓
   React Extension
        ↓
   FastAPI Backend
        ↓
    Google Gemini
        ↓
    AI Analysis
```

## Setup

### Frontend

```bash
npm install
npm run build
```

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn google-genai python-dotenv
```

Create a `.env` file inside `backend`:

```env
GEMINI_API_KEY=your_api_key_here
```

Start the backend:

```bash
uvicorn main:app --reload
```

### Load the Extension

1. Open Chrome
2. Go to `chrome://extensions`
3. Enable Developer Mode
4. Click **Load unpacked**
5. Select the `dist` folder
6. Open an Amazon product page
7. Open Amazon Helper

### Video

https://github.com/user-attachments/assets/b36e1f66-fd1a-4f14-8b76-2ad295dc4738

## AI Assistance

Claude was used to help design and build the frontend UI.