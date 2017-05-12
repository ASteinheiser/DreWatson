# Drewaston

This is a simple micro-service that will perform image recognition using IBM Watson. It accepts a JSON object with one key(image) containing a base64 encoded image.

## Usage
Clone and Run:
```
git clone https://github.com/ASteinheiser/drewatson.git
npm install
npm start
```
Test Endpoints:
```
curl -X GET localhost:3000/
curl -X GET localhost:3000/version
curl -X POST -d @sample-image.json --header "Content-Type: application/json" localhost:3000/recognition
```
