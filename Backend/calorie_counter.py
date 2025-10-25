import google.generativeai as genai
from dotenv import load_dotenv
import sys
import os
import json

# Configure Gemini client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def get_calories_from_image(image_data):
    # image_data can be a file path (str) or BytesIO
    if isinstance(image_data, str):
        with open(image_data, "rb") as img:
            image_bytes = img.read()
    else:
        # assume BytesIO
        image_bytes = image_data.read()
        image_data.seek(0)

    # Load multimodal model
    import google.generativeai as genai
    import os
    import json
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = """
    Analyze the food in this image. For each distinct food item, estimate its name, portion size, calories, protein, carbs, and fat content.
    Return the output in valid JSON format only.

    IMPORTANT: The 'total_calories' should be a single number (string) without units.
    The 'calories' field for each food item should be a single estimated number (string) without units.
    The 'protein', 'carbs', and 'fat' fields for each food item should be a single estimated number (string) representing grams (g) without units.

    Example structure:
    {
      "food_items": [
        {
          "name": "Grilled Chicken Breast",
          "calories": "180",
          "protein": "35",
          "carbs": "0",
          "fat": "4"
        }
      ],
      "total_calories": "180",
      "total_protein": "35",
      "total_carbs": "0",
      "total_fat": "4"
    }
    """

    system_instruction = (
        "You are a specialized nutritional AI. You must respond strictly and only "
        "with the requested JSON format, ensuring all fields (name, calories, protein, "
        "carbs, fat) are present for every item, and total macros are summarized."
    )

    response = model.generate_content(
        [
            prompt,
            system_instruction,
            {"mime_type": "image/jpeg", "data": image_bytes}
        ]
    )

    try:
        result_text = response.text.strip()
        json_start = result_text.find("{")
        json_end = result_text.rfind("}") + 1
        json_str = result_text[json_start:json_end]
        return json.loads(json_str)
    except Exception as e:
        return {"error": "Failed to parse JSON", "raw_response": response.text}
