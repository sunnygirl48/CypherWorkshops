from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Replace with your OpenWeatherMap API key
OPENWEATHER_API_KEY = 'b06dbf910c042bb9bbc5e47d7afdadb4'

@app.route('/api/weather', methods=['GET'])
def get_weather():
    # Get the city name from the query parameter
    city = request.args.get('city', 'Phoenix')  # Default to 'Phoenix' if no city is provided
    
    # Construct the OpenWeatherMap API URL
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={OPENWEATHER_API_KEY}'
    
    try:
        # Make a request to the OpenWeatherMap API
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Return the weather data as JSON
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return jsonify({"error": "Failed to fetch weather data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
