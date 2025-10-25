import React from 'react';
import { ArrowRight, Upload, Cpu, TrendingUp } from 'lucide-react';

// START: Inlined Shared Components (Fix for compilation error)
/**
 * Component for the "How It Works" step cards.
 */
const StepCard = ({ number, title, description, colorClass }) => (
  <div className="flex flex-col items-center text-center p-4 max-w-[180px] sm:max-w-none"> {/* Added max-w to prevent overlap on small screens */}
    <div className={`w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl font-bold mb-3 ${colorClass} shadow-xl`}> {/* Increased size, font, and shadow */}
      {number}
    </div>
    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

/**
 * Component for the main feature cards.
 */
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"> {/* Stronger shadow, subtle hover effect */}
    <div className="text-indigo-500 mb-4 flex justify-center">{icon}</div> {/* Centered icon and increased bottom margin */}
    <h4 className="text-xl font-bold text-gray-800 mb-2 text-center">{title}</h4> {/* Centered title */}
    <p className="text-gray-600 text-sm text-center">{description}</p> {/* Centered description */}
  </div>
);
// END: Inlined Shared Components

/**
 * 1. Landing Page Component (The Home/Default view)
 * @param {object} props - Component props.
 * @param {function} props.navigateTo - Function to change the app's current page state.
 */
const HomePage = ({ navigateTo }) => {
  return (
    <div className="w-full p-4 flex flex-col items-center"> {/* Added flex-col and items-center to center content */}
      {/* Hero Section - Adjusted background gradient and padding */}
      <header className="text-center w-full max-w-2xl p-10 mb-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow-inner"> 
        <div className="flex flex-col items-center">
            <span className="text-4xl">🍎</span> 
            <h1 className="text-5xl font-extrabold text-gray-900 mt-3">
                AI Calorie Predictor
            </h1>
            <p className="text-xl text-gray-600 mt-2">
                Discover the nutritional content of your meals instantly
            </p>
        </div>
      </header>

      {/* Main Call to Action Card - Adjusted shadow, border, and button styling */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border-t-8 border-indigo-500 mb-12 transform hover:scale-[1.01] transition duration-300 max-w-3xl w-full"> {/* Stronger shadow, thicker top border */}
        <div className="flex justify-center text-4xl mb-4 space-x-2">
            <span role="img" aria-label="robot">🤖</span>
            <span role="img" aria-label="phone">📱</span>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Smart Food Analysis</h2>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Upload any food image and our advanced AI will identify ingredients and calculate precise calorie counts for each component. Perfect for tracking your nutrition goals!
        </p>
        
        <div className="flex justify-center">
            <button
                onClick={() => navigateTo('analyze')}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/50 hover:from-purple-700 hover:to-indigo-700 transition duration-300 transform hover:-translate-y-1 flex items-center group" // Added group for hover effects
            >
                Get Started 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" /> {/* Arrow animation on hover */}
            </button>
        </div>
      </div>

      {/* Feature Grid - Increased icon size and centered content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl"> {/* Adjusted max-width */}
        <FeatureCard 
          icon={<Upload className="w-10 h-10 mx-auto" />} // Larger icon, centered
          title="Easy Upload"
          description="Simply drag and drop or click to upload your food photos from any device."
        />
        <FeatureCard 
          icon={<Cpu className="w-10 h-10 mx-auto" />} // Larger icon, centered
          title="AI Analysis"
          description="Advanced machine learning identifies ingredients and estimates portion sizes accurately."
        />
        <FeatureCard 
          icon={<TrendingUp className="w-10 h-10 mx-auto" />} // Larger icon, centered
          title="Detailed Results"
          description="Get calorie breakdown for each ingredient in your meal for precise tracking."
        />
      </div>

      {/* How It Works Section - Adjusted layout and colors */}
      <div className="text-center mt-16 p-8 bg-white rounded-xl shadow-lg w-full max-w-4xl"> {/* Adjusted max-width */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">How It Works</h2>
        <div className="flex justify-around items-start flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-4"> {/* Changed to flex-col for mobile, flex-row for sm+ */}
          <StepCard 
            number={1} 
            title="Upload Image" 
            description="Take or upload a photo of your meal." 
            colorClass="bg-gradient-to-br from-indigo-500 to-indigo-700" // Gradient color
          />
          {/* Removed explicit ArrowRight here, as the image doesn't show it for desktop */}
          <StepCard 
            number={2} 
            title="AI Processing" 
            description="Our AI analyzes and identifies all ingredients." 
            colorClass="bg-gradient-to-br from-purple-500 to-purple-700" // Gradient color
          />
          {/* Removed explicit ArrowRight here */}
          <StepCard 
            number={3} 
            title="Get Results" 
            description="View detailed calorie breakdown and total count." 
            colorClass="bg-gradient-to-br from-pink-500 to-pink-700" // Gradient color
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;