'use strict';

var request = require('superagent');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.js');

var app = express();
var PORT = process.env.PORT || 3000;
var API_KEY = process.env.API_KEY || config.API_KEY;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Resolve user input for departure destination
app.get('/api/suggestions_and_resolutions/:query', function(req, response, next) {
  request.get("http://terminal2.expedia.com/x/suggestions/flights?")
  .query({query: req.params.query})
  .query({apikey: API_KEY})
  .end(function(err, res){
    response.json(res.body.sr[0]);
    next();
  });
});

// Search flights API
app.get('/api/flight_search/:query', function(req, response, next) {
  request.get('http://terminal2.expedia.com:80/x/mflights/search?')
    .query(req.params.query)
    .query({apikey: API_KEY})
    .end(function(err, res) {
      console.log(res.body);
      response.json(res.body);
      next();
    });
});

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT)
});
