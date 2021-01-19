var express = require('express');
var router = express.Router();
var request = require('sync-request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search',function(req, res, next){

  var url = "https://musicbrainz.org/ws/2/artist?query="+req.body.artist+"&fmt=json&limit=10"
  var response = request('GET', url);
  response = JSON.parse(response.getBody());

  res.send(response);


});




module.exports = router;
