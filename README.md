# Drewaston

This is a simple micro-service that will perform image recognition using IBM Watson.

### Usage
Clone, install, run:
```
git clone https://github.com/ASteinheiser/drewatson.git
npm install
npm start
```
In another terminal tab:
```
curl -X POST -F "image=@bloom.jpeg" localhost:3000/recognition
```
