var express         = require('express'),
    app             = express(),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser');
    methodOverride  = require('method-override');

// Express config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

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

// New - form to create new post
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

// Show - show a post
app.get('/blog/:id', function(req, res) {
  var id = req.params.id;
  Blog.findById(id, function(err, blogData) {
    if (err) {
      res.redirect('/blog');
    } else {
      res.render('show', {blogData: blogData});
    }
  });
});

// Edit - form to edit a post
app.get('/blog/:id/edit', function(req, res) {
  var id = req.params.id;
  Blog.findById(id, function(err, blogData) {
    if (err) {
      res.redirect('/blog/' + id);
    } else {
      res.render('edit', {blogData, blogData});
    }
  });
});

// Update - update a post
app.put('/blog/:id', function(req, res) {
  var id = req.params.id;
  var blogUpdate = req.body.blog;
  Blog.findByIdAndUpdate(id, blogUpdate, function(err) {
    if (err) {
      res.redirect('/blog/' + id + '/edit');
    } else {
      res.redirect('/blog/' + id);
    }
  });
});

app.listen(3000);