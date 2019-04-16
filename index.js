let path = require('path');
let expressEdge = require('express-edge');
let express = require('express');
let app = new express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let Post = require('./database/models/Post');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
  .then(() => 'You are now connected to Mongo!')
  .catch(err => console.error('Something went wrong', err));

app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', async (req, res) => {
  let posts = await Post.find({});
  res.render('index', { posts });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/post', (req, res) => {
  res.render('post');
});
  app.get('/posts/new', (req, res) => {
    res.render('create');
  });
  app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
      res.redirect('/')
    })
  });
  app.get('/post/:id', async (req, res) => {
    let post = await Post.findById(req.params.id)
    res.render('post', { post })
  })

app.listen(4000, () => {
  console.log('App listening on port 4000');
});