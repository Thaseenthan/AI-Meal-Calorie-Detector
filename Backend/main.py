import google.generativeai as genai
from dotenv import load_dotenv
import sys
import os
import json

from calorie_counter import get_calories_from_image

load_dotenv()

# Configure Gemini client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))



if __name__ == "__main__":
    if len(sys.argv) < 2:
        image_path = "Test_image/food1.jpg"
        print(f"No image path provided. Using default: {image_path}")
    else:
        image_path = sys.argv[1]

    if not os.path.exists(image_path):
        print(f"Error: File '{image_path}' not found.")
        sys.exit(1)

    calories_info = get_calories_from_image(image_path)
    print("Calories Information (JSON):")
    print(json.dumps(calories_info, indent=2))
