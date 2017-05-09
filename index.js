var bodyParser = require('body-parser')
var express = require('express')
var fs = require('fs')
var sharp = require('sharp')
var VisualRecognitionV3 = require('watson-developer-cloud').VisualRecognitionV3

var package = require('./package')
var credentials = require('./watson.json')

var visual_recognition = new VisualRecognitionV3({
  api_key: credentials.api_key,
  version_date: '2016-05-19'
})

var app = express()
app.use(bodyParser.json({limit: '50mb'}))
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
  console.log('Press CTRL-C to stop\n')
})

app.get('/', function(request, response) {
  response.status(200).send('Hello! You can GET /version or POST an image to /recognition...')
})

app.get('/version', function(request, response) {
  response.status(200).send(package.version)
})

app.post('/recognition', function(request, response) {
  if (!request.body.image) return response.status(400).send('No image specified...')

  sharp(new Buffer(request.body.image, 'base64'))
    .resize(750,1000)
    .toFile('image-to-send.jpg', function(err, info) {

      var params = {
        images_file: fs.createReadStream('image-to-send.jpg'),
        classifier_ids: ["hue_1859332055", "default"]
      }

      visual_recognition.classify(params, function(err, res) {
        if (err) return response.status(500).send(err)
        response.status(200).send(res.images[0].classifiers[0].classes[0])
      })
    })
})

module.exports = app
