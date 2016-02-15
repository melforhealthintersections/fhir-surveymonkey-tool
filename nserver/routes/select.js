var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // convert the code to a token
  //

  var log = '';

  try {
    var s = document.URL
    log += s.substring(s.indexOf('code=') + 5)+'\r\n';
    var xhttp = new XMLHttpRequest();
    log += 'still going'+'\r\n';
    xhttp.open("POST", "https://api.surveymonkey.net/oauth/token?api_key=hxw4mq8t66cmhvg8rj6h8ffd", false);
    log += 'and still going again'+'\r\n';
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    log += 'and still going again and again'+'\r\n';
    xhttp.send("client_secret=ed5btDPdNQXg63kud2xuaHM2Qp3P38ej&code=ox40W0Of9q0CBecUS30iO8-AjawM1bVfQ01tyoXV46Loyit6P5w5ScpR.DN36aIMHzoC3e-PCfnAKvBEmOoY00g2wxf7k-i-ffnzZxvX1j.QHvG7DdyOyEKdbPYMl4TjgKjs4TvOSHf5gENGJBAWMq6t0BnGImgUHQh8LF0K-JrGzG4xHr6kFx5.HKiUXNFlx947phfrSPbBdUXaOy5t1g%3D%3D&redirect_uri=http%3A%2F%2Flocalhost%3A63342%2Ffhir-surveymonkey-tool%2Fselect.html&grant_type=authorization_code");
    log += xhttp.status+'\r\n';
    log += xhttp.responseText+'\r\n';
  }
  catch (err) {
    log += err+'\r\n';
  }
  // now, we inject the survery list into tha page, and send it off.
  res.render('select', { title: log });
});

module.exports = router;
