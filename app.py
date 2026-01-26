# import streamlit as st
# from calorie_counter import get_calories_from_image
# from PIL import Image
# import io
# import os
# from dotenv import load_dotenv
# import re

# # Load API key
# load_dotenv()
# os.environ["GEMINI_API_KEY"] = os.getenv("GEMINI_API_KEY")

# st.set_page_config(
#     page_title="AI Meal Calorie Predictor",
#     page_icon="🍔",
#     layout="centered"
# )

# st.title("🍔 AI Meal Calorie Predictor")
# st.write("Upload a food image and get calorie estimates instantly!")

# # File uploader
# uploaded_file = st.file_uploader("Choose a food image", type=["jpg", "jpeg", "png"])

# if uploaded_file:
#     # Display image preview
#     image = Image.open(uploaded_file)
#     st.image(image, caption="Uploaded Image", width='stretch')

#     # Convert image to bytes for your function
#     image_bytes = io.BytesIO()
#     image.save(image_bytes, format='JPEG')
#     image_bytes.seek(0)

#     # Get calories info
#     calories_info = get_calories_from_image(image_bytes)

#     if calories_info.get("food_items"):
#         st.subheader("Calories Information")
#         total_calories_value = 0

#         # Display each food item as a colored card
#         for item in calories_info["food_items"]:
#             # Extract numeric calories if possible
#             match = re.search(r'\d+', item['calories'])
#             cal_value = int(match.group()) if match else 0
#             total_calories_value += cal_value

#             # Determine card color
#             if cal_value >= 400:
#                 color = "#f73535"  # high-calorie → red
#             elif cal_value >= 150:
#                 color = "#f2dd22"  # medium → yellow
#             else:
#                 color = "#27f742"  # low → green

#             st.markdown(
#                 f"""
#                 <div style="padding:15px; margin:10px 0; background-color:{color}; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1); color:black;">
#                     <h4 style="margin:0; color:black;">{item['name']}</h4>
#                     <p style="margin:0; color:black;">{item['calories']}</p>
#                 </div>
#                 """,
#                 unsafe_allow_html=True
#             )

#         st.markdown(f"**Total Calories:** {calories_info.get('total_calories', total_calories_value)}")


#     else:
#         st.write("No food items detected.")




# import streamlit as st
# from calorie_counter import get_calories_from_image
# from PIL import Image
# import io
# import os
# from dotenv import load_dotenv
# import re

# # Load environment variables
# load_dotenv()
# os.environ["GEMINI_API_KEY"] = os.getenv("GEMINI_API_KEY")

# # Streamlit page setup
# st.set_page_config(
#     page_title="AI Meal Calorie Predictor",
#     page_icon="🍔",
#     layout="centered"
# )

# # --- Custom CSS Styling ---
# st.markdown("""
#     <style>
#     body {
#         font-family: 'Poppins', sans-serif;
#         background: linear-gradient(135deg, #f9fafb, #eef2ff);
#         color: #111827;
#     }
#     .main-title {
#         text-align: center;
#         font-size: 2.8rem;
#         font-weight: 700;
#         color: #1f2937;
#         margin-bottom: 0.2rem;
#     }
#     .sub-title {
#         text-align: center;
#         font-size: 1.1rem;
#         color: #4b5563;
#         margin-bottom: 2rem;
#     }

#     /* Make Streamlit uploader big */
#     div[data-testid="stFileUploader"] {
#         border: 3px dashed #94a3b8;
#         border-radius: 16px;
#         background-color: #f8fafc;
#         padding: 60px 20px;
#         text-align: center;
#         transition: all 0.3s ease;
#     }
#     div[data-testid="stFileUploader"]:hover {
#         border-color: #3b82f6;
#         background-color: #eff6ff;
#         transform: scale(1.02);
#     }
#     div[data-testid="stFileUploader"] label {
#         font-size: 1.2rem !important;
#         color: #475569 !important;
#         font-weight: 500 !important;
#     }

#     /* Image preview styling */
#     .image-preview {
#         border-radius: 20px;
#         box-shadow: 0 4px 12px rgba(0,0,0,0.15);
#         margin-top: 1rem;
#     }

#     /* Food card styles */
#     .food-card {
#         padding: 1rem 1.2rem;
#         margin-top: 1rem;
#         border-radius: 12px;
#         box-shadow: 0 3px 8px rgba(0,0,0,0.12);
#         color: #111;
#         font-weight: 500;
#         transition: all 0.3s ease;
#     }
#     .food-card:hover {
#         transform: translateY(-2px);
#         box-shadow: 0 4px 10px rgba(0,0,0,0.2);
#     }

#     .total-card {
#         margin-top: 2rem;
#         background-color: #2563eb;
#         color: white;
#         text-align: center;
#         padding: 1.2rem;
#         border-radius: 12px;
#         box-shadow: 0 3px 8px rgba(0,0,0,0.15);
#     }
#     </style>
# """, unsafe_allow_html=True)

# # --- Header ---
# st.markdown("<h1 class='main-title'>🍔 AI Meal Calorie Predictor</h1>", unsafe_allow_html=True)
# st.markdown("<p class='sub-title'>Upload your food image and instantly get AI-predicted calorie insights!</p>", unsafe_allow_html=True)

# # --- Functional Uploader (styled) ---
# uploaded_file = st.file_uploader("📸 Drag & Drop your food image here", type=["jpg", "jpeg", "png"])

# # --- Main Logic ---
# if uploaded_file:
#     image = Image.open(uploaded_file)
#     st.image(image, caption="🍽️ Uploaded Image", use_container_width=True)

#     image_bytes = io.BytesIO()
#     image.save(image_bytes, format='JPEG')
#     image_bytes.seek(0)

#     with st.spinner("🔍 Analyzing your meal... Please wait..."):
#         calories_info = get_calories_from_image(image_bytes)

#     if calories_info.get("food_items"):
#         st.subheader("🥗 Calorie Breakdown")

#         total_calories_value = 0
#         for item in calories_info["food_items"]:
#             match = re.search(r'\d+', item['calories'])
#             cal_value = int(match.group()) if match else 0
#             total_calories_value += cal_value

#             if cal_value >= 400:
#                 color = "#f87171"
#             elif cal_value >= 150:
#                 color = "#facc15"
#             else:
#                 color = "#4ade80"

#             st.markdown(
#                 f"""
#                 <div class="food-card" style="background-color:{color};">
#                     <h4 style="margin:0; font-weight:600;">{item['name']}</h4>
#                     <p style="margin:0; font-size:1rem;">{item['calories']}</p>
#                 </div>
#                 """,
#                 unsafe_allow_html=True
#             )

#         total_display = calories_info.get('total_calories', total_calories_value)
#         st.markdown(f"""
#             <div class="total-card">
#                 <h3>🔥 Total Estimated Calories: {total_display} kcal</h3>
#             </div>
#         """, unsafe_allow_html=True)
#     else:
#         st.warning("⚠️ No recognizable food items detected. Try another image.")
# else:
#     st.info("👆 Upload a food image to begin.")
    