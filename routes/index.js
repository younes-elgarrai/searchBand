var express = require('express');
var router = express.Router();
var request = require('sync-request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search',function(req, res, next){

  var url = "https://musicbrainz.org/ws/2/artist?query="+req.body.artist+"&fmt=json&limit=10"
  var response = request('GET', url, {
    headers: {
      'user-agent': 'searchBand/1.0.0',
    },
  });

  response = JSON.parse(response.getBody());

  // recuperation des ids :

  var artists = response.artists ;

  var idTable = [];
  var nameTable = [];

  for (let index = 0; index < artists.length; index++) {
    idTable.push(
      artists[index].id
    );
    nameTable.push(
      artists[index].name
    )
  }

  res.render('artists',{nameTable : nameTable, idTable: idTable});


});

router.get('/releases',function(req,res,next){

  var id = req.query.id;
  var url = "https://musicbrainz.org/ws/2/artist/"+id+"?inc=releases&fmt=json"
  var response = request('GET', url, {
    headers: {
      'user-agent': 'searchBand/1.0.0',
    },
  });

  response = JSON.parse(response.getBody());


  var releases = response.releases ;

  var releasesTable = [];

  for (let index = 0; index < releases.length; index++) {
    releasesTable.push(
      releases[index].title
    )
  }
  
  res.render('releases', {releasesTable: releasesTable});


});




module.exports = router;
