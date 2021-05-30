var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Party2vec' });
});

router.post('/py', function(req, res) {
  var tweet_text = req.body.param
  res.send('got' + tweet_text)
});

module.exports = router;
