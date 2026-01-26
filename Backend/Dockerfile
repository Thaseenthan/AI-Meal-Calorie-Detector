# Use official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app

# Create uploads directory
RUN mkdir -p static/uploads

# Expose port (Railway will set PORT env variable)
EXPOSE 8080

# Command to run the Flask app with gunicorn
CMD gunicorn server:app --bind 0.0.0.0:$PORT
