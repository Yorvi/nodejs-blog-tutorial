let path = require('path');
let expressEdge = require('express-edge');
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');

let homePageController = require('./controllers/homePage.js');
let createPostController = require('./controllers/createPost.js');
let getPostController = require('./controllers/getPost.js');
let storePostController = require('./controllers/storePost.js');

let app = new express();
app.use(express.static('public'));

let Post = require('./database/models/Post');
mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
  .then(() => 'You are now connected to Mongo!')
  .catch(err => console.error('Something went wrong', err));

app.use(fileUpload());
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

app.get('/', homePageController);
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/post', (req, res) => {
  res.render('post');
});
  app.get('/posts/new', createPostController);
  app.post('/posts/store', storePostController);
  app.get('/post/:id', getPostController)

app.listen(4000, () => {
  console.log('App listening on port 4000');
});