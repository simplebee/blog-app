var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

// Express config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose schema and model
mongoose.connect('mongodb://localhost/blog-app');

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// Routes
// Landing page
app.get('/', function(req, res) {
  res.redirect('/blog');
});

// Index - show all posts
app.get('/blog', function(req, res) {
  Blog.find(function(err, blogData) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {blogData: blogData});
    }
  });
});

// New - show form to create new post
app.get('/blog/new', function(req, res) {
  res.render('new');
});

// Create - create new post
app.post('/blog', function(req, res) {
  var blogData = req.body.blog;
  Blog.create(blogData, function(err) {
    if (err) {
      res.redirect('/blog/new');
    } else {
      res.redirect('/blog');
    }
  });
});

app.listen(3000);