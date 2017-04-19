var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.redirect('/blog');
});

app.get('/blog', function(req, res) {
  res.render('index');
});

app.listen(3000);