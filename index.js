var express = require('express')
var fileUpload = require('express-fileupload')
var VisualRecognitionV3 = require('watson-developer-cloud').VisualRecognitionV3

var package = require('./package')
var credentials = require('./watson.json')

var visual_recognition = new VisualRecognitionV3({
  api_key: credentials.api_key,
  version_date: '2016-05-19'
})

var app = express()
app.use(fileUpload())
app.set('port', process.env.PORT || 3000)

app.get('/version', function(request, response) {
  response.send(package.version)
})

app.listen(app.get('port'), () => {
 console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
 console.log('Press CTRL-C to stop\n')
})

app.post('/recognition', function(request, response) {
  if (!request.files) return response.status(400).send('No files were uploaded...')

  var params = {
    images_file: request.files.image.data,
    classifier_ids: ["hue_1859332055", "default"]
  }

  visual_recognition.classify(params, function(err, res) {
    if (err) return response.send(err)
    response.send(JSON.stringify(res, null, 2))
  })
})

module.exports = app
