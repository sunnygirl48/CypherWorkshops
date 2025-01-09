from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/greet', methods=['POST'])
def greet():
    data = request.get_json()
    name = data.get('name', '')
    if not name.strip():
        return jsonify({'message': 'Please enter a valid name.'}), 400
    return jsonify({'message': f'Hello, {name}! Welcome to the workshop.'})

if __name__ == '__main__':
    app.run(debug=True)