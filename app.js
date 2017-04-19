var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

// Express config
app.set('view engine', 'ejs');

// Mongoose schema and model
mongoose.connect('mongodb://localhost/blog-app');

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  create: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/', function(req, res) {
  res.redirect('/blog');
});

// Index
app.get('/blog', function(req, res) {
  Blog.find(function(err, blogData) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {blogData: blogData});
    }
  });
});

app.listen(3000);