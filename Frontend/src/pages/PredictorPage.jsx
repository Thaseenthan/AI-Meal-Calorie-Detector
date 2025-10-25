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
                        <div className="bg-blue-100 p-6 rounded-2xl shadow-lg border-t-8 border-blue-800 text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Analyzed Image</h2>
                            <img 
                                src={imageToShow} 
                                alt="Food uploaded for analysis" 
                                className="max-h-96 w-auto mx-auto rounded-xl shadow-md border border-gray-200 object-contain" 
                            />
                            <button
                                onClick={handleAnalyzeNew}
                                className="mt-4 px-4 py-2 text-sm bg-gray-700 text-white rounded-full hover:bg-gray-200 hover:text-black transition"
                            >
                                Analyze New Image
                            </button>
                        </div>
                    )}

                    {/* Calorie Analysis Results */}
                    <div className="flex flex-col md:flex-row gap-6 p-8 bg-blue-100 rounded-2xl shadow-lg border-t-8 border-blue-800">
                        {/* Detected Ingredients Column */}
                        <div className="flex-1 md:pr-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Detected Ingredients</h2>
                            <div className="space-y-4">
                                {food_items.map((item, index) => (
                                    <div key={index} className="flex items-center bg-gray-100 shadow-xl p-4 rounded-xl  border border-gray-100">
                                        {/* REMOVED ICON DISPLAY BLOCK */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                P: {item.protein || 'N/A'}g | C: {item.carbs || 'N/A'}g | F: {item.fat || 'N/A'}g
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="text-lg font-bold text-blue-700">
                                                {item.calories || 'N/A'}
                                            </span>
                                            <span className="text-sm text-gray-500 block">kcal</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total Nutrition Column */}
                        <div className="md:w-1/3 md:pl-4 md:border-l border-gray-200 mt-8 md:mt-0">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Total Nutrition</h2>
                            <div className="bg-linear-to-br from-blue-300 to-indigo-100 p-6 rounded-2xl text-center mb-6 shadow-md">
                                <p className="text-5xl font-extrabold text-blue-700">{total_calories || 'N/A'}</p>
                                <p className="text-lg text-gray-600">Total Calories (kcal)</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-gray-700 font-medium">
                                    <span>Protein:</span>
                                    <span className="font-bold text-green-600">{finalTotalProtein}g</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700 font-medium">
                                    <span>Carbs:</span>
                                    <span className="font-bold text-blue-600">{finalTotalCarbs}g</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700 font-medium">
                                    <span>Fat:</span>
                                    <span className="font-bold text-orange-600">{finalTotalFat}g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- Upload Page Content (Unchanged) ---
        return (
            <div className="bg-blue-100 p-8 rounded-2xl shadow-lg border-t-8 border-indigo-800 mx-w-auto w-full mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Upload Your Food Image</h2>
                
                {/* Drag & Drop Area */}
                <div
                    className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition duration-300 cursor-pointer mb-8"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={triggerFileInput}
                >
                    <Camera className="w-12 h-12 text-gray-500 mb-4" />
                    <p className="text-xl font-semibold text-gray-700 mb-1">Drag & Drop Your Image</p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
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
                    <div className="text-center mb-6">
                        <p className="text-gray-700 text-lg">Selected: <span className="font-medium">{file.name}</span></p>
                        {previewUrl && <img src={previewUrl} alt="Preview" className="max-w-xs max-h-48 mx-auto mt-4 rounded-lg shadow-md" />}
                    </div>
                )}


                {/* Choose File Button - Centered */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={triggerFileInput}
                        className="px-8 py-3 bg-blue-800 text-white font-semibold rounded-full shadow-lg hover:bg-blue-900 transition duration-300"
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
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSubmit}
                        disabled={!file || isLoading}
                        className={`
                            px-12 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 
                            ${!file || isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-linear-to-r from-green-400 to-indigo-500 text-white hover:from-green-500 hover:to-indigo-600 hover:shadow-xl active:from-green-600 active:to-indigo-700'
                            }
                            flex items-center justify-center space-x-2 w-full max-w-sm
                        `}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                <span>Predicting...</span>
                            </>
                        ) : (
                            <>
                                <span className="inline-block w-3 h-3 bg-white rounded-full mr-2"></span>
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
        <div className="min-h-screen  flex flex-col items-center p-4 sm:p-6 md:p-8">
            {/* Header - Always visible */}
            <header className="w-full max-w-7xl flex items-center justify-between py-4 px-6 bg-blue-200 rounded-xl shadow-lg mb-8">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigateTo('')} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <span className="text-2xl">🍎</span>
                    <h1 className="text-2xl font-bold text-gray-800">AI Calorie Predictor</h1>
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