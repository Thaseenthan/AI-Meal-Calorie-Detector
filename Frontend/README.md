# AI Calorie Predictor App

## Prerequisites

- **Python 3.8+** (for Backend)
- **Node.js 16+** (for Frontend)
- **Gemini API Key** (Get from Google AI Studio)

---

## Backend Setup

### 1. Install Required Packages

Navigate to the Backend folder and install dependencies:

```bash
cd Backend
pip install Flask
pip install flask-cors
pip install google-generativeai
pip install pillow
pip install python-dotenv
```

Or install from requirements.txt:

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the `Backend` folder:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Backend Server

```bash
python server.py
```

Backend will run on: **http://localhost:5000**

---

## Frontend Setup

### 1. Install Required Packages

Navigate to the Frontend folder and install dependencies:

```bash
cd Frontend
npm install
```

The following packages will be installed:
- React 19.1.1
- React Router DOM
- Vite (Build tool)
- Tailwind CSS v4
- Lucide React (Icons)

### 2. Run Frontend Development Server

```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## How to Use

1. **Start Backend**: Run `python server.py` in Backend folder
2. **Start Frontend**: Run `npm run dev` in Frontend folder
3. **Access App**: Open browser at http://localhost:5173
4. **Upload Image**: Click "Get Started" and upload a food image
5. **View Results**: See calorie breakdown and nutritional information

---

## Project Structure

```
CalorieApp/
├── Backend/
│   ├── server.py           # Flask API server
│   ├── calorie_counter.py  # AI analysis logic
│   ├── requirements.txt    # Python dependencies
│   └── .env               # API keys (create this)
│
└── Frontend/
    ├── src/
    │   ├── pages/         # HomePage and PredictorPage
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point
    ├── package.json       # Node dependencies
    └── README.md         # This file
```

---

## Package Lists

### Backend Packages (Python)
- Flask - Web framework
- flask-cors - CORS support for API
- google-generativeai - Gemini AI integration
- pillow - Image processing
- python-dotenv - Environment variable management

### Frontend Packages (Node.js)
- react - UI framework
- react-dom - React DOM rendering
- react-router-dom - Routing
- vite - Build tool and dev server
- tailwindcss - Utility-first CSS
- lucide-react - Icon library
