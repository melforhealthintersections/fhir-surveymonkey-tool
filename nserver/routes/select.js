var express = require('express');
var http = require('http');
var https = require('https');
var router = express.Router();
var qs = require('querystring');
var log = '';

// adapted from https://nodejs.org/api/http.html#http_http_request_options_callback
function completeOAuthLogin(url, res) {

  var postData = qs.stringify({
    'client_secret' : 'ed5btDPdNQXg63kud2xuaHM2Qp3P38ej',
    'client_id' : 'ed5btDPdNQXg63kud2xuaHM2Qp3P38ej',
    'code' : url.substring(url.indexOf('code=')+5),
    'redirect_uri' : 'http://localhost:3000/select.html',
    'client_id' : 'sm_grahameg_gmail_com',
    'grant_type' : 'authorization_code'
  });

  var options = {
    hostname: 'api.surveymonkey.net',
    protocol: 'https:',
    path: '/oauth/token?api_key=hxw4mq8t66cmhvg8rj6h8ffd',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = https.request(options, function(response) {
    log += 'STATUS: ${res.statusCode}\r\n';
    log += 'HEADERS: ${JSON.stringify(res.headers)}\r\n';
    response.setEncoding('utf8');
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      log += body+'\r\n';
      var json = JSON.parse(body);
      if (json.error)
        res.render('error', { error: null, message: json.error_description});
      else
        res.render('select', { title: 'TEST', json: body });
    });
  });

  req.on('error', function (e) {
    log += 'problem with request: ${e.message}\r\n';
  });

  // write data to request body
  req.write(postData);
  req.end();
};

router.get('/select.html', function(req, res, next) {

  try {
    var json = completeOAuthLogin(req.url, res);
  }
  catch (err) {
    log += err+'\r\n';
    res.render('error', { error: err, message: "oh no"});
  }
});


module.exports = router;
