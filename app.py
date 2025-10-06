import streamlit as st
from calorie_counter import get_calories_from_image
from PIL import Image
import io
import os
from dotenv import load_dotenv
import re

# Load API key
load_dotenv()
os.environ["GEMINI_API_KEY"] = os.getenv("GEMINI_API_KEY")

st.set_page_config(
    page_title="AI Meal Calorie Predictor",
    page_icon="🍔",
    layout="centered"
)

st.title("🍔 AI Meal Calorie Predictor")
st.write("Upload a food image and get calorie estimates instantly!")

# File uploader
uploaded_file = st.file_uploader("Choose a food image", type=["jpg", "jpeg", "png"])

if uploaded_file:
    # Display image preview
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", width='stretch')

    # Convert image to bytes for your function
    image_bytes = io.BytesIO()
    image.save(image_bytes, format='JPEG')
    image_bytes.seek(0)

    # Get calories info
    calories_info = get_calories_from_image(image_bytes)

    if calories_info.get("food_items"):
        st.subheader("Calories Information")
        total_calories_value = 0

        # Display each food item as a colored card
        for item in calories_info["food_items"]:
            # Extract numeric calories if possible
            match = re.search(r'\d+', item['calories'])
            cal_value = int(match.group()) if match else 0
            total_calories_value += cal_value

            # Determine card color
            if cal_value >= 400:
                color = "#f73535"  # high-calorie → red
            elif cal_value >= 150:
                color = "#f2dd22"  # medium → yellow
            else:
                color = "#27f742"  # low → green

            st.markdown(
                f"""
                <div style="padding:15px; margin:10px 0; background-color:{color}; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1); color:black;">
                    <h4 style="margin:0; color:black;">{item['name']}</h4>
                    <p style="margin:0; color:black;">{item['calories']}</p>
                </div>
                """,
                unsafe_allow_html=True
            )

        st.markdown(f"**Total Calories:** {calories_info.get('total_calories', total_calories_value)}")


    else:
        st.write("No food items detected.")
