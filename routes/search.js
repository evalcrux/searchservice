var elasticsearch = require('elasticsearch');
var es_user =  process.env.ES_USER;
var es_pass = process.env.ES_PASS;
var cloud_url = process.env.ES_URL
var es_url = `https://${es_user}:${es_pass}@${cloud_url}/`

var client = new elasticsearch.Client({
  host: es_url,
  log: 'debug'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 30000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

exports.find = function(req, res) {
  console.log("find called");
  console.log("params: " + JSON.stringify(req.params));
  console.log("body: " + JSON.stringify(req.body));
  console.log("qeury:" + req.query);
  client.search({
  requestTimeout: 30000,
  index: req.params.index,
  type: req.params.type,
  body: req.body,
  query: req.query

}).then(function (body) {
  var hits = body.hits.hits;
  res.send(hits);
}, function (error) {
  console.trace(error.message);
});
}

exports.findAll = function(req, res) {
  var index = req.params.type, type = req.params.type;

  console.log("findAll called");
  client.search({
    requestTimeout: 30000,
    index: req.params.index,
    type: req.params.type
  }).then(function (body) {
    var hits = body.hits.hits;
    res.send(hits);
  }, function (error) {
    console.trace(error.message);
  });


};

exports.findById = function(req, res) {
  console.log("findById called");
  client.search({
    index: req.params.index,
    type: req.params.type,
    body: {
      query: {
        query_string: {
          default_field: "_id",
          query: req.params.id
        }
      }
    }
  }).then(function (body) {
    var hits = body.hits.hits;
    res.send(hits);
  }, function (error) {
    console.trace(error.message);
  });
};
