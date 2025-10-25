import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PredictorPage from './pages/PredictorPage.jsx';
import './App.css'

// Basic Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4" 
             style={{ background: 'linear-gradient(135deg, #f87171 0%, #fecaca 100%)' }}>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h2>
          <p className="text-lg text-red-700">We are sorry, an unexpected error occurred. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Main Application Router.
 * This component sets up the routing for the application.
 */
const AppRoutes = () => {
  // useNavigate hook is used for programmatic navigation
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`); // Use path-based navigation
    window.scrollTo(0, 0); // Scroll to top on page change for smooth transition
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage navigateTo={navigateTo} />} />
      <Route path="/analyze" element={<PredictorPage navigateTo={navigateTo} />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        {/*
          CORRECTION: Ensure the opening <div> tag is closed with a final >
          The className and style props must be within the same tag block
        */}
        <div 
          className="min-h-screen flex flex-col items-center p-4" 
          style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)' }}
        >
          
          {/* Dynamic Content */}
          <div className="w-full flex-grow">
            <AppRoutes />
          </div>

          {/* Fixed Footer */}
          <footer className="mt-16 w-full max-w-4xl border-t border-gray-700 pt-4 pb-2 text-center text-sm text-gray-900">
            &copy; {new Date().getFullYear()} AI Calorie Predictor. All rights reserved.
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//    <div>
//     <h1 className="text-4xl font-bold text-red-500">
//     Hello world!
//   </h1>
//    </div>
//   )
// }

// export default App