// Express app for serving search service API

var search = require('./routes/search'),
bodyParser = require('body-parser'),
morgan = require('morgan');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

// GET APIs
app.use(bodyParser.json());
app.get('/:index/:type/:id', search.findById);
app.get('/_search', search.findAll);
app.get('/:index/_search', search.findAll);
app.get('/:index/:type/_search', search.findAll);
app.get('/:index/_search/q=:q', search.find);
app.get('/:index/:type/_search/q=:q', search.find);

// POST APIs
app.post('/:index/_search', search.find);



app.listen(port);

console.log('elasticsearch service RESTful API server started on: ' + port);
