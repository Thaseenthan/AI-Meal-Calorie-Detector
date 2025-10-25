import React from 'react';

/**
 * Component for the "How It Works" step cards.
 * @param {object} props - Component props.
 * @param {number} props.number - The step number.
 * @param {string} props.title - The step title.
 * @param {string} props.description - The step description.
 * @param {string} props.colorClass - Tailwind class for the circle background color.
 */
export const StepCard = ({ number, title, description, colorClass }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-xl font-bold mb-3 ${colorClass} shadow-lg`}>
      {number}
    </div>
    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

/**
 * Component for the main feature cards.
 * @param {object} props - Component props.
 * @param {JSX.Element} props.icon - Lucide icon component.
 * @param {string} props.title - Feature title.
 * @param {string} props.description - Feature description.
 */
export const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
    <div className="text-indigo-500 mb-3">{icon}</div>
    <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Note: We use named exports for easy import in other files.
