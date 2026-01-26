import React from 'react';
import { ArrowRight, Upload, Cpu, TrendingUp } from 'lucide-react';

// START: Inlined Shared Components (Fix for compilation error)
/**
 * Component for the "How It Works" step cards.
 */
const StepCard = ({ number, title, description, colorClass }) => (
  <div className="flex flex-col items-center text-center p-6 max-w-[220px] sm:max-w-none transform hover:scale-110 transition-transform duration-300">
    <div className={`w-24 h-24 flex items-center justify-center rounded-full text-white text-3xl font-extrabold mb-4 ${colorClass} shadow-2xl animate-pulse`}>
      {number}
    </div>
    <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-base text-gray-600 leading-relaxed">{description}</p>
  </div>
);

/**
 * Component for the main feature cards.
 */
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl shadow-xl border-2 border-teal-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group">
    <div className="text-teal-600 mb-6 flex justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{icon}</div>
    <h4 className="text-2xl font-extrabold text-gray-800 mb-3 text-center">{title}</h4>
    <p className="text-gray-600 text-base text-center leading-relaxed">{description}</p>
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
    <div className="w-full p-3 flex flex-col items-center "> {/* Added flex-col and items-center to center content */}
      {/* Hero Section - Modern gradient with animation */}
      <header className="text-center w-full p-12 mb-10 rounded-3xl bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        <div className="flex flex-col items-center relative z-10">
            <div className="text-6xl mb-4 animate-bounce">🍎</div> 
            <h1 className="text-6xl font-extrabold text-white mt-3 drop-shadow-2xl">
                AI Calorie Predictor
            </h1>
            <p className="text-2xl text-white/90 mt-4 font-medium">
                Discover the nutritional content of your meals instantly
            </p>
        </div>
      </header>

      {/* Main Call to Action Card - Glassmorphism effect */}
      <div className="backdrop-blur-xl bg-white/70 p-10 sm:p-14 rounded-3xl shadow-2xl border border-white/40 mb-12 transform hover:scale-[1.02] transition-all duration-500 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-emerald-400/10 to-cyan-400/10"></div>
        <div className="relative z-10">
          <div className="flex justify-center text-5xl mb-6 space-x-3 animate-pulse">
              <span role="img" aria-label="robot">🤖</span>
              <span role="img" aria-label="phone">📱</span>
          </div>
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-6">Smart Food Analysis</h2>
          <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Upload any food image and our advanced AI will identify ingredients and calculate precise calorie counts for each component. Perfect for tracking your nutrition goals!
          </p>
          
          <div className="flex justify-center">
              <button
                  onClick={() => navigateTo('analyze')}
                  className="px-10 py-4 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:from-teal-700 hover:via-emerald-700 hover:to-cyan-700 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center group"
              >
                  Get Started 
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
          </div>
        </div>
      </div>

      {/* Feature Grid - Increased icon size and centered content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl"> {/* Adjusted max-width */}
        <FeatureCard 
          icon={<Upload className="w-50 h-40 mx-auto" />} // Larger icon, centered
          title="Easy Upload"
          description="Simply drag and drop or click to upload your food photos from any device."
        />
        <FeatureCard 
          icon={<Cpu className="w-50 h-40 mx-auto" />} // Larger icon, centered
          title="AI Analysis"
          description="Advanced machine learning identifies ingredients and estimates portion sizes accurately."
        />
        <FeatureCard 
          icon={<TrendingUp className="w-50 h-40 mx-auto" />} // Larger icon, centered
          title="Detailed Results"
          description="Get calorie breakdown for each ingredient in your meal for precise tracking."
        />
      </div>

      {/* How It Works Section - Enhanced design */}
      <div className="text-center mt-12 p-12 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 rounded-3xl shadow-2xl w-full border-2 border-emerald-200">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-10">How It Works</h2>
        <div className="flex justify-around items-start flex-col sm:flex-row space-y-10 sm:space-y-0 sm:space-x-4"> {/* Changed to flex-col for mobile, flex-row for sm+ */}
          <StepCard 
            number={1} 
            title="Upload Image" 
            description="Take or upload a photo of your meal." 
            colorClass="bg-gradient-to-br from-teal-400 to-teal-700 shadow-teal-500/50"
          />
          {/* Removed explicit ArrowRight here, as the image doesn't show it for desktop */}
          <StepCard 
            number={2} 
            title="AI Processing" 
            description="Our AI analyzes and identifies all ingredients." 
            colorClass="bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-emerald-500/50"
          />
          <StepCard 
            number={3} 
            title="Get Results" 
            description="View detailed calorie breakdown and total count." 
            colorClass="bg-gradient-to-br from-cyan-400 to-cyan-700 shadow-cyan-500/50"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;