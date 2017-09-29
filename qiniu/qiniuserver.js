var qiniu = require('qiniu');
var express = require('express');
var config = require('./config.js');
var app = express();


var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
var options = {
  scope: config.Bucket,
  deleteAfterDays: 30,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var bucketManager = new qiniu.rs.BucketManager(mac, null);

app.get('/uptoken', function(req, res, next) {
  var token = putPolicy.uploadToken(mac);
  res.header("Cache-Control", "max-age=0, private, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (token) {
    res.json({
      uptoken: token
    });
  }
});

app.post('/downtoken', function(req, res) {

  var key = req.body.key;
  var domain = req.body.domain;

  //trim '/' if the domain's last char is '/'
  if (domain.lastIndexOf('/') === domain.length - 1) {
    domain = domain.substr(0, domain.length - 1);
  }

  var deadline = 3600 + Math.floor(Date.now() / 1000);
  var privateDownUrl = bucketManager.privateDownloadUrl(domain, key,
    deadline);
  res.json({
    url: privateDownUrl,
  });

});

app.listen(config.Port, function() {
  console.log('Listening on port %d\n', config.Port);
});
