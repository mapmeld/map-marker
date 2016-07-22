const express = require('express');
const request = require('request');

var app = express();
app.use(express.static('static'));

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.get('/data', function(req, res) {
  request('https://openstreetmap.org/api/0.6/map?bbox=' + req.query.bbox, function (err, response, body) {
    res.send(body);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('ready');
});
