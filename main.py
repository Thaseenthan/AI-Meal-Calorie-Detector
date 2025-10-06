import google.generativeai as genai
from dotenv import load_dotenv
import sys
import os
import json

load_dotenv()

# Configure Gemini client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_calories_from_image(image_path: str):
    with open(image_path, "rb") as img:
        image_bytes = img.read()

    # Load multimodal model
    model = genai.GenerativeModel("gemini-2.5-flash")

    # Ask Gemini to return structured JSON
    prompt = """
    Analyze the food in this image and return the output in valid JSON format only.
    Example structure:
    {
      "food_items": [
        {"name": "Donut", "calories": "300 - 450 calories per donut"},
        {"name": "Coffee", "calories": "50 calories"}
      ],
      "total_calories": "1200"
    }
    """

    response = model.generate_content(
        [
            prompt,
            {"mime_type": "image/jpeg", "data": image_bytes}
        ]
    )

    # Gemini may return text with explanation, so extract JSON safely
    try:
        result_text = response.text.strip()
        # Find the JSON part (first { ... } block)
        json_start = result_text.find("{")
        json_end = result_text.rfind("}") + 1
        json_str = result_text[json_start:json_end]
        return json.loads(json_str)
    except Exception as e:
        return {"error": "Failed to parse JSON", "raw_response": response.text}


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
