let path = require('path');
let expressEdge = require('express-edge');
let express = require('express');
let app = new express();
let mongoose = require('mongoose');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
  .then(() => 'You are now connected to Mongo!')
  .catch(err => console.error('Something went wrong', err))

app.use(expressEdge);
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index');
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

app.listen(4000, () => {
  console.log('App listening on port 4000');
});