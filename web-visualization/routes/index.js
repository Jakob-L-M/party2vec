var express = require('express');
var router = express.Router();
const { spawn } = require('child_process')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Party2vec' });
});

router.post('/py', function (req, res) {
  var tweet_text = req.body.param

  // result will be written here
  var python_return;

  // spawn('python3', ...) for server. python 3.5.3
  const python = spawn('./venv/python', ["./public/python/hello.py", tweet_text]);
  // collect data from script -> print out result in main method
  python.stdout.on('data', function (data) { //stdout
    console.log('Pipe data from python script ...');
    python_return = data.toString();
  });
  python.stderr.on('data', function (data) {
    console.log(data);
    python_return = data.toString();
  })
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(python_return)
  });
});

module.exports = router;
