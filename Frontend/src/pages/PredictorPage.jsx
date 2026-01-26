import React, { useState, useCallback, useMemo } from 'react';
import {
    Upload,
    Loader,
    Camera, 
    AlertTriangle,
    ArrowLeft, 
    Moon, 
    // Icons are imported but deliberately not used in the UI, as requested
    Drumstick, 
    BarChart2, 
    Leaf, 
    Droplet, 
    Cherry, 
    Utensils, 
} from 'lucide-react';

// The base URL for the Flask API (running on port 5000)
const API_URL = 'http://localhost:5000/predict';

/**
 * 2. Calorie Predictor Component (The analysis logic)
 * @param {object} props - Component props.
 * @param {function} props.navigateTo - Function to change the app's current page state.
 */
const PredictorPage = ({ navigateTo }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [results, setResults] = useState(null); // This will hold the full API response: { image_url: "...", calories_info: { ... } }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [theme, setTheme] = useState('light'); 

    const handleFileChange = useCallback((event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setResults(null);
            setError('');
        }
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setResults(null);
            setError('');
        } else {
            setError('Only image files are allowed.');
        }
    }, []);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const triggerFileInput = useCallback(() => {
        document.getElementById('file-upload').click();
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!file) {
            setError('Please select an image file first.');
            return;
        }

        setIsLoading(true);
        setError('');
        setResults(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(API_URL, { method: 'POST', body: formData });
            const data = await response.json();

            if (!response.ok) {
                // Improved error handling for specific backend errors
                const errorMessage = data.error || `HTTP Error: ${response.status} ${response.statusText}`;
                setError(errorMessage);
            } else {
                console.log('API Response:', data);
                
                // Check if we received valid analysis data
                if (data.calories_info && data.calories_info.food_items && data.calories_info.food_items.length > 0) {
                    setResults(data);
                } else {
                    setError(data.error || "No recognizable food items detected in the image. Try another one.");
                }
            }
        } catch (err) {
            console.error('API Call Error:', err);
            setError('Could not connect to the API. Make sure the Flask server is running on port 5000.');
        } finally {
            setIsLoading(false);
        }
    }, [file]);


    // FIX: Modified to return null to remove icons, as requested.
    const getItemIcon = (itemName) => {
        return null; 
    };
    
    // Function to clear results and restart upload process
    const handleAnalyzeNew = useCallback(() => {
        setResults(null); 
        setFile(null); 
        setPreviewUrl(''); 
        setError('');
    }, []);


    // --- Conditionally Rendered Content ---
    const renderContent = useMemo(() => {
        if (results && results.calories_info && results.calories_info.food_items && results.calories_info.food_items.length > 0) {
            
            const { 
                food_items, 
                total_calories, 
                total_protein, 
                total_carbs, 
                total_fat 
            } = results.calories_info;
            
            // FIX: Get image URL from the top-level results object
            const imageToShow = results.image_url;
            
            const finalTotalProtein = total_protein ? parseFloat(total_protein).toFixed(1) : 'N/A';
            const finalTotalCarbs = total_carbs ? parseFloat(total_carbs).toFixed(1) : 'N/A';
            const finalTotalFat = total_fat ? parseFloat(total_fat).toFixed(1) : 'N/A';
            
            return (
                <div className="flex flex-col gap-6 w-full ">
                    
                    {/* NEW: Display the Uploaded Image Preview */}
                    {imageToShow && (
                        <div className="backdrop-blur-xl bg-white/70 p-8 rounded-3xl shadow-2xl border-2 border-teal-300 text-center">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-6 border-b-2 border-emerald-200 pb-3">Analyzed Image</h2>
                            <img 
                                src={imageToShow} 
                                alt="Food uploaded for analysis" 
                                className="max-h-96 w-auto mx-auto rounded-2xl shadow-2xl border-4 border-white object-contain" 
                            />
                            <button
                                onClick={handleAnalyzeNew}
                                className="mt-6 px-8 py-3 text-base bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-full hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                            >
                                Analyze New Image
                            </button>
                        </div>
                    )}

                    {/* Calorie Analysis Results */}
                    <div className="flex flex-col md:flex-row gap-8 p-10 backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border-2 border-emerald-300">
                        {/* Detected Ingredients Column */}
                        <div className="flex-1 md:pr-6">
                            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-8 border-b-2 border-emerald-200 pb-4">Detected Ingredients</h2>
                            <div className="space-y-5">
                                {food_items.map((item, index) => (
                                    <div key={index} className="flex items-center bg-gradient-to-r from-white to-teal-50 shadow-xl p-5 rounded-2xl border-2 border-teal-200 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
                                        {/* REMOVED ICON DISPLAY BLOCK */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-base text-gray-600 font-medium">
                                                P: {item.protein || 'N/A'}g | C: {item.carbs || 'N/A'}g | F: {item.fat || 'N/A'}g
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                                {item.calories || 'N/A'}
                                            </span>
                                            <span className="text-sm text-gray-500 block font-semibold">kcal</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total Nutrition Column */}
                        <div className="md:w-1/3 md:pl-6 md:border-l-2 border-emerald-200 mt-8 md:mt-0">
                            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-8 border-b-2 border-emerald-200 pb-4">Total Nutrition</h2>
                            <div className="bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 p-8 rounded-3xl text-center mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <p className="text-6xl font-extrabold text-white drop-shadow-2xl">{total_calories || 'N/A'}</p>
                                <p className="text-xl text-white/90 font-bold mt-2">Total Calories (kcal)</p>
                            </div>
                            <div className="space-y-5">
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-2 border-green-300 shadow-lg">
                                    <span className="font-bold text-gray-800 text-lg">Protein:</span>
                                    <span className="font-extrabold text-green-600 text-xl">{finalTotalProtein}g</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300 shadow-lg">
                                    <span className="font-bold text-gray-800 text-lg">Carbs:</span>
                                    <span className="font-extrabold text-blue-600 text-xl">{finalTotalCarbs}g</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-2 border-orange-300 shadow-lg">
                                    <span className="font-bold text-gray-800 text-lg">Fat:</span>
                                    <span className="font-extrabold text-orange-600 text-xl">{finalTotalFat}g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- Upload Page Content (Unchanged) ---
        return (
            <div className="backdrop-blur-xl bg-white/70 p-10 rounded-3xl shadow-2xl border-2 border-emerald-200 max-w-3xl w-full mx-auto">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent text-center mb-8">Upload Your Food Image</h2>
                
                {/* Drag & Drop Area */}
                <div
                    className="flex flex-col items-center justify-center p-16 text-center border-3 border-dashed border-emerald-400 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 transition-all duration-500 cursor-pointer mb-8 transform hover:scale-[1.02] group"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={triggerFileInput}
                >
                    <Camera className="w-16 h-16 text-emerald-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                    <p className="text-2xl font-bold text-gray-800 mb-2">Drag & Drop Your Image</p>
                    <p className="text-base text-gray-500">or click to browse files</p>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* Selected File Preview */}
                {file && (
                    <div className="text-center mb-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-300">
                        <p className="text-gray-800 text-xl mb-4">Selected: <span className="font-bold text-green-600">{file.name}</span></p>
                        {previewUrl && <img src={previewUrl} alt="Preview" className="max-w-xs max-h-56 mx-auto rounded-xl shadow-2xl border-4 border-white" />}
                    </div>
                )}


                {/* Choose File Button - Centered */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={triggerFileInput}
                        className="px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                    >
                        Choose File
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center space-x-2 shadow-md">
                        <AlertTriangle className="w-5 h-5" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {/* Predict Calories Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={!file || isLoading}
                        className={`
                            px-14 py-5 text-xl font-bold rounded-full shadow-2xl transition-all duration-500 
                            ${!file || isLoading
                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                : 'bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 text-white hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-700 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-2 hover:scale-110'
                            }
                            flex items-center justify-center space-x-3 w-full max-w-md
                        `}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="w-6 h-6 animate-spin" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <span className="inline-block w-4 h-4 bg-white rounded-full animate-pulse"></span>
                                <span>Predict Calories</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        );
    }, [file, previewUrl, results, isLoading, error, handleDrop, handleDragOver, handleFileChange, handleSubmit, triggerFileInput, getItemIcon, handleAnalyzeNew]);


    // --- Calorie Predictor UI ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex flex-col items-center p-4 sm:p-6 md:p-8">
            {/* Header - Always visible */}
            <header className="w-full max-w-7xl flex items-center justify-between py-5 px-8 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 rounded-2xl shadow-2xl mb-10">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigateTo('')} className="text-white hover:text-gray-200 transition-colors transform hover:scale-110 duration-300">
                        <ArrowLeft className="w-7 h-7" />
                    </button>
                    <span className="text-3xl animate-bounce">🍎</span>
                    <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">AI Calorie Predictor</h1>
                </div>
                {/* <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Theme:</span>
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className={`p-2 rounded-full flex items-center space-x-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                    >
                        <Moon className="w-5 h-5" />
                        <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
                    </button>
                </div> */}
            </header>

            {/* Main Content Area */}
            <div className="w-full max-w-7xl">
                {renderContent}
            </div>
        </div>
    );
};

export default PredictorPage;