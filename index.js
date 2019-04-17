let path = require('path');
let expressEdge = require('express-edge');
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');
let expressSession = require('express-session');
let connectMongo = require('connect-mongo');

let homePageController = require('./controllers/homePage.js');
let createPostController = require('./controllers/createPost.js');
let getPostController = require('./controllers/getPost.js');
let storePostController = require('./controllers/storePost.js');
let createUserController = require('./controllers/createUser.js');
let storeUserController = require('./controllers/storeUser');
let loginController = require('./controllers/login');
let loginUserController = require('./controllers/loginUser');

let app = new express();
app.use(express.static('public'));
app.use(expressSession({ secret: 'secret' }));

let Post = require('./database/models/Post');
mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
  .then(() => 'You are now connected to Mongo!')
  .catch(err => console.error('Something went wrong', err));

let mongoStore = connectMongo(expressSession);
app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}))

app.use(fileUpload());
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

app.get('/', homePageController);
app.get('/auth/register', createUserController);
  app.get('/auth/login', loginController);
  app.post('/users/login', loginUserController);
  app.post('/users/register', storeUserController);
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
  app.get('/post/:id', getPostController);

app.listen(4000, () => {
  console.log('App listening on port 4000');
});