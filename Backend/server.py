# from flask import Flask, render_template, request, redirect, url_for
# import os
# import json
# from calorie_counter import get_calories_from_image
# from dotenv import load_dotenv


# load_dotenv()
# app = Flask(__name__)
# # Save uploaded files to static/uploads
# app.config["UPLOAD_FOLDER"] = os.path.join("static", "uploads")
# os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# @app.route("/", methods=["GET"])
# def index():
#     return render_template("index.html")

# @app.route("/predict", methods=["POST"])
# def predict():
#     if "image" not in request.files:
#         return "No file uploaded", 400

#     file = request.files["image"]
#     if file.filename == "":
#         return "No selected file", 400

#     # Save file in static/uploads
#     filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
#     file.save(filepath)

#     # Get calories info
#     calories_info = get_calories_from_image(filepath)

#     # URL for HTML
#     image_url = url_for("static", filename=f"uploads/{file.filename}")

#     return render_template("index.html", image_url=image_url, calories_info=calories_info)

# if __name__ == "__main__":
#     app.run(debug=True)



from flask import Flask, request, jsonify, url_for
from flask_cors import CORS  # Import CORS
import os
import json
from calorie_counter import get_calories_from_image
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

# 1. Configure CORS to allow your React app to access the API
# Replace 'http://localhost:3000' with the actual URL of your React development server.
# Using CORS(app) with no arguments allows all origins, which is acceptable for development.

CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

# Save uploaded files to static/uploads
app.config["UPLOAD_FOLDER"] = os.path.join("static", "uploads")
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


# The index route is no longer needed as the React app will be the entry point.
# @app.route("/", methods=["GET"])
# def index():
#     return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        # Return JSON error response
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        # Return JSON error response
        return jsonify({"error": "No selected file"}), 400

    # Save file in static/uploads
    # In a production environment, you should use a more secure/unique filename.
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)

    try:
        # Get calories info (This function must return a serializable dict/JSON structure)
        calories_info = get_calories_from_image(filepath)

        # URL for the uploaded image (for React to display it)
        # Note: React would typically get the image data back and display it, 
        # but if you want to serve the saved image, this URL works.
        image_url = url_for("static", filename=f"uploads/{file.filename}", _external=True)

        # 2. Return the data as a JSON response
        # The React frontend will receive this JSON object.
        response_data = {
            "image_url": image_url,
            "calories_info": calories_info
        }
        return jsonify(response_data), 200

    except Exception as e:
        # Handle potential errors during calorie prediction
        print(f"Prediction Error: {e}")
        return jsonify({"error": "Failed to process image and predict calories"}), 500


if __name__ == "__main__":
    # Consider using a different port than the default 5000 if needed, 
    # but 5000 is fine if React runs on 3000.
    app.run(debug=True, port=5000, host='0.0.0.0')